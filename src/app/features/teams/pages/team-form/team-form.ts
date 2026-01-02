import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../../../../core/services/team.service';
import { Team } from '../../models/team.model';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.html',
})
export class TeamFormComponent implements OnInit {

  form!: FormGroup;
  isEdit = false;
  teamId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      active: [true],
    });

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

  const payload = this.form.value as Team;

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