import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TeamService } from '../../../../core/services/team.service';
import { Team } from '../../models/team.model';

@Component({
  selector: 'app-team-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './team-form.html',
})
export class TeamFormComponent implements OnInit {

  form!: FormGroup;

  /** Controle de edição */
  isEdit = false;
  teamId!: number;

  /** Tipos de serviço (pré-definidos) */
  tiposServico = [
    { value: 'Comercial', label: 'Comercial' },
    { value: 'Manutenção', label: 'Manutenção' },
    { value: 'Obras', label: 'Obras' },
  ];

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      tipoServico: ['', Validators.required],
      responsavel: ['', Validators.required],
      quantidadeMembros: [1, [Validators.required, Validators.min(1)]],
      descricao: [''],
      status: ['ATIVA', Validators.required],
    });

    // Verifica se é edição
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.isEdit = true;
      this.teamId = Number(idParam);

      const team = this.teamService.buscarPorId(this.teamId);

      if (team) {
        this.form.patchValue(team);
      }
    }
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Team = {
      id: this.isEdit ? this.teamId : Date.now(),
      ...this.form.value,
    };

    if (this.isEdit) {
      this.teamService.atualizar(this.teamId, payload);
    } else {
      this.teamService.criar(payload);
    }

    this.router.navigate(['/teams']);
  }

  cancelar(): void {
    this.router.navigate(['/teams']);
  }
}