export type UserRole = 'master' | 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  empresa_id?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Empresa {
  id: string;
  nome: string;
  cidade: string;
  status: 'ativo' | 'inativo' | 'pendente';
  created_at: string;
}

export interface Projeto {
  id: string;
  empresa_id: string;
  protocolo: string;
  tipo: 'residencial' | 'comercial' | 'industrial' | 'misto';
  endereco: string;
  status: 'pendente' | 'em_analise' | 'aprovado' | 'reprovado' | 'pendencias';
  analista_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Analise {
  id: string;
  projeto_id: string;
  analista_id: string;
  resultado: 'aprovado' | 'reprovado' | 'pendencias';
  observacoes: string;
  tempo_analise_minutos: number;
  created_at: string;
}

export interface Tarefa {
  id: string;
  user_id: string;
  titulo: string;
  descricao?: string;
  projeto_id?: string;
  data_limite: string;
  status: 'pendente' | 'em_andamento' | 'concluida';
  prioridade: 'baixa' | 'media' | 'alta';
  created_at: string;
}

export interface StatsCard {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
}
