import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportData, ReportsService } from '../../../../core/services/reports.mock';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})


export class ReportsComponent implements OnInit {
  reportData!: ReportData;
  periodoSelecionado: string = 'Este Mês';

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.reportsService.getReportData().subscribe(res => {
      this.reportData = res;
    });
  }

  exportReport(format: string): void {
    alert(`Exportando relatório em formato ${format.toUpperCase()} (Simulado)...`);
  }

  printReport(): void {
    window.print();
  }
}