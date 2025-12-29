import { FileSearch, Clock, CheckCircle2, AlertCircle, Calendar, TrendingUp } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { ProjectCard } from './ProjectCard';
import { TaskList } from './TaskList';
import { useAuth } from '@/contexts/AuthContext';
import { Projeto, Tarefa } from '@/types';
import { useNavigate } from 'react-router-dom';

// Mock data
const mockProjetos: Projeto[] = [
  {
    id: '1',
    empresa_id: 'emp-1',
    protocolo: '2024-00145',
    tipo: 'residencial',
    endereco: 'Rua das Palmeiras, 234 - Centro',
    status: 'pendente',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    empresa_id: 'emp-1',
    protocolo: '2024-00144',
    tipo: 'comercial',
    endereco: 'Av. Beira Mar Norte, 1200',
    status: 'em_analise',
    analista_id: '3',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    empresa_id: 'emp-1',
    protocolo: '2024-00143',
    tipo: 'misto',
    endereco: 'Rua Lauro Linhares, 500',
    status: 'aprovado',
    analista_id: '3',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const mockTarefas: Tarefa[] = [
  {
    id: '1',
    user_id: '3',
    titulo: 'Revisar documentação projeto #2024-00145',
    projeto_id: '1',
    data_limite: new Date(Date.now() + 86400000).toISOString(),
    status: 'pendente',
    prioridade: 'alta',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    user_id: '3',
    titulo: 'Verificar conformidade com Plano Diretor',
    projeto_id: '2',
    data_limite: new Date(Date.now() + 172800000).toISOString(),
    status: 'em_andamento',
    prioridade: 'media',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    user_id: '3',
    titulo: 'Emitir parecer técnico final',
    projeto_id: '2',
    data_limite: new Date(Date.now() + 259200000).toISOString(),
    status: 'pendente',
    prioridade: 'baixa',
    created_at: new Date().toISOString(),
  },
];

export function AnalystDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const pendingProjects = mockProjetos.filter(p => p.status === 'pendente' || p.status === 'em_analise');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Olá, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Aqui está o resumo das suas atividades de hoje
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Projetos Pendentes"
          value={2}
          change="+1 novo hoje"
          changeType="neutral"
          icon={FileSearch}
        />
        <StatsCard
          title="Em Análise"
          value={1}
          icon={Clock}
        />
        <StatsCard
          title="Aprovados este mês"
          value={12}
          change="+23% vs mês anterior"
          changeType="positive"
          icon={CheckCircle2}
        />
        <StatsCard
          title="Tempo Médio"
          value="2.3 dias"
          change="-0.5 dias"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Projetos para Análise</h2>
            <button 
              onClick={() => navigate('/projetos')}
              className="text-sm text-primary hover:underline"
            >
              Ver todos
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingProjects.map((projeto) => (
              <ProjectCard 
                key={projeto.id} 
                projeto={projeto}
                onAnalyze={() => navigate('/analise/nova')}
              />
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Minhas Tarefas</h2>
            <button 
              onClick={() => navigate('/calendario')}
              className="text-sm text-primary hover:underline"
            >
              Ver calendário
            </button>
          </div>
          <div className="glass rounded-xl p-4">
            <TaskList tasks={mockTarefas} />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass rounded-xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: FileSearch, label: 'Nova Análise', href: '/analise/nova', primary: true },
            { icon: Calendar, label: 'Agendar Tarefa', href: '/calendario' },
            { icon: CheckCircle2, label: 'Histórico', href: '/projetos' },
            { icon: AlertCircle, label: 'Pendências', href: '/projetos' },
          ].map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.href)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 ${
                action.primary 
                  ? 'gradient-primary text-primary-foreground hover:shadow-glow' 
                  : 'bg-secondary hover:bg-secondary/80 text-foreground'
              }`}
            >
              <action.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
