import { Users, FileSearch, Clock, TrendingUp, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Mock analysts data
const mockAnalistas = [
  { id: '1', name: 'Maria Santos', projetos: 15, aprovados: 12, reprovados: 2, pendencias: 1, tempoMedio: 2.1 },
  { id: '2', name: 'João Oliveira', projetos: 12, aprovados: 10, reprovados: 1, pendencias: 1, tempoMedio: 2.8 },
  { id: '3', name: 'Ana Costa', projetos: 18, aprovados: 15, reprovados: 2, pendencias: 1, tempoMedio: 1.9 },
  { id: '4', name: 'Pedro Lima', projetos: 10, aprovados: 8, reprovados: 1, pendencias: 1, tempoMedio: 3.2 },
];

export function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Dashboard do Secretário
        </h1>
        <p className="text-muted-foreground mt-1">
          Visão geral da Secretaria de Desenvolvimento Urbano
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total de Analistas"
          value={4}
          icon={Users}
        />
        <StatsCard
          title="Projetos este mês"
          value={55}
          change="+12% vs mês anterior"
          changeType="positive"
          icon={FileSearch}
        />
        <StatsCard
          title="Taxa de Aprovação"
          value="82%"
          change="+5%"
          changeType="positive"
          icon={CheckCircle2}
        />
        <StatsCard
          title="Tempo Médio Geral"
          value="2.5 dias"
          change="-0.3 dias"
          changeType="positive"
          icon={Clock}
        />
      </div>

      {/* Analysts Performance */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Desempenho dos Analistas</h2>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Este mês
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Analista</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Projetos</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Aprovados</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Reprovados</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Pendências</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Tempo Médio</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Performance</th>
              </tr>
            </thead>
            <tbody>
              {mockAnalistas.map((analista, index) => {
                const taxaAprovacao = (analista.aprovados / analista.projetos * 100).toFixed(0);
                const isGoodPerformance = analista.tempoMedio < 2.5;
                
                return (
                  <tr 
                    key={analista.id} 
                    className="border-b border-border/50 hover:bg-secondary/30 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">
                            {analista.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium text-foreground">{analista.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-foreground font-medium">{analista.projetos}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-success">
                        <CheckCircle2 className="w-4 h-4" />
                        {analista.aprovados}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-destructive">
                        <XCircle className="w-4 h-4" />
                        {analista.reprovados}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-warning">
                        <AlertTriangle className="w-4 h-4" />
                        {analista.pendencias}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={cn(
                        "font-medium",
                        isGoodPerformance ? "text-success" : "text-warning"
                      )}>
                        {analista.tempoMedio} dias
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${taxaAprovacao}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{taxaAprovacao}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Projetos por Tipo</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="flex items-end gap-4 h-48">
              {[
                { label: 'Residencial', value: 45, color: 'bg-primary' },
                { label: 'Comercial', value: 30, color: 'bg-primary/70' },
                { label: 'Industrial', value: 15, color: 'bg-primary/50' },
                { label: 'Misto', value: 10, color: 'bg-primary/30' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-2">
                  <div 
                    className={cn("w-12 rounded-t-lg transition-all duration-500", item.color)}
                    style={{ height: `${item.value * 2}px` }}
                  />
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Evolução Mensal</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="flex items-end gap-2 h-48 w-full px-4">
              {[35, 42, 38, 55, 48, 62, 55].map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-primary/80 rounded-t-lg transition-all duration-500 hover:bg-primary"
                    style={{ height: `${value * 2}px` }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
