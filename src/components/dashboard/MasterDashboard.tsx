import { Building2, Users, FileSearch, TrendingUp, Activity, Globe } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Mock prefeituras data
const mockPrefeituras = [
  { id: '1', nome: 'Florianópolis', estado: 'SC', analistas: 4, projetos: 156, status: 'ativo' },
  { id: '2', nome: 'Joinville', estado: 'SC', analistas: 3, projetos: 98, status: 'ativo' },
  { id: '3', nome: 'Blumenau', estado: 'SC', analistas: 2, projetos: 67, status: 'ativo' },
  { id: '4', nome: 'Curitiba', estado: 'PR', analistas: 5, projetos: 203, status: 'pendente' },
  { id: '5', nome: 'Porto Alegre', estado: 'RS', analistas: 0, projetos: 0, status: 'inativo' },
];

const statusConfig = {
  ativo: { label: 'Ativo', className: 'bg-success/20 text-success' },
  pendente: { label: 'Pendente', className: 'bg-warning/20 text-warning' },
  inativo: { label: 'Inativo', className: 'bg-muted text-muted-foreground' },
};

export function MasterDashboard() {
  const totalProjetos = mockPrefeituras.reduce((acc, p) => acc + p.projetos, 0);
  const totalAnalistas = mockPrefeituras.reduce((acc, p) => acc + p.analistas, 0);
  const prefeituraAtivas = mockPrefeituras.filter(p => p.status === 'ativo').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Painel Master
        </h1>
        <p className="text-muted-foreground mt-1">
          Visão geral de todas as prefeituras da plataforma UrbanPlan
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Prefeituras Ativas"
          value={prefeituraAtivas}
          change="+2 este mês"
          changeType="positive"
          icon={Building2}
        />
        <StatsCard
          title="Total de Analistas"
          value={totalAnalistas}
          icon={Users}
        />
        <StatsCard
          title="Projetos Analisados"
          value={totalProjetos}
          change="+18% vs mês anterior"
          changeType="positive"
          icon={FileSearch}
        />
        <StatsCard
          title="Uptime da Plataforma"
          value="99.9%"
          icon={Activity}
        />
      </div>

      {/* Prefeituras Table */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Prefeituras Cadastradas</h2>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {mockPrefeituras.length} total
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Prefeitura</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Estado</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Analistas</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Projetos</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockPrefeituras.map((prefeitura, index) => {
                const status = statusConfig[prefeitura.status as keyof typeof statusConfig];
                
                return (
                  <tr 
                    key={prefeitura.id} 
                    className="border-b border-border/50 hover:bg-secondary/30 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <span className="font-medium text-foreground">{prefeitura.nome}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-muted-foreground">{prefeitura.estado}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-foreground font-medium">{prefeitura.analistas}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-foreground font-medium">{prefeitura.projetos}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge className={cn("text-xs", status.className)}>
                        {status.label}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Platform Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Sistema Operacional</h3>
              <p className="text-sm text-muted-foreground">Todos os serviços online</p>
            </div>
          </div>
          <div className="space-y-2">
            {['API Gateway', 'Database', 'AI Engine', 'Storage'].map((service) => (
              <div key={service} className="flex items-center justify-between py-2">
                <span className="text-sm text-muted-foreground">{service}</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs text-success">Online</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Métricas de Uso</h3>
              <p className="text-sm text-muted-foreground">Últimas 24 horas</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Requisições API</span>
              <span className="font-medium text-foreground">12,453</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Análises IA</span>
              <span className="font-medium text-foreground">847</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Usuários Ativos</span>
              <span className="font-medium text-foreground">23</span>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Expansão</h3>
              <p className="text-sm text-muted-foreground">Pipeline de vendas</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Em negociação</span>
              <span className="font-medium text-foreground">8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Demo agendado</span>
              <span className="font-medium text-foreground">5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Contrato enviado</span>
              <span className="font-medium text-foreground">2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
