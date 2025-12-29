import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { cn } from '@/lib/utils';
import { Projeto } from '@/types';

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
  {
    id: '4',
    empresa_id: 'emp-1',
    protocolo: '2024-00142',
    tipo: 'industrial',
    endereco: 'Rod. SC-401, km 5',
    status: 'reprovado',
    analista_id: '3',
    created_at: new Date(Date.now() - 259200000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    empresa_id: 'emp-1',
    protocolo: '2024-00141',
    tipo: 'residencial',
    endereco: 'Rua Bocaiúva, 89',
    status: 'pendencias',
    analista_id: '3',
    created_at: new Date(Date.now() - 345600000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    empresa_id: 'emp-1',
    protocolo: '2024-00140',
    tipo: 'comercial',
    endereco: 'Av. Rio Branco, 456',
    status: 'aprovado',
    analista_id: '3',
    created_at: new Date(Date.now() - 432000000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const statusFilters = [
  { value: 'all', label: 'Todos' },
  { value: 'pendente', label: 'Pendentes' },
  { value: 'em_analise', label: 'Em Análise' },
  { value: 'aprovado', label: 'Aprovados' },
  { value: 'reprovado', label: 'Reprovados' },
  { value: 'pendencias', label: 'Pendências' },
];

export default function Projetos() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProjetos = mockProjetos.filter(p => {
    const matchesSearch = p.protocolo.includes(search) || 
                         p.endereco.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = mockProjetos.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Projetos
          </h1>
          <p className="text-muted-foreground mt-1">
            {filteredProjetos.length} projetos encontrados
          </p>
        </div>
        <Button variant="gradient" onClick={() => navigate('/analise/nova')}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Análise
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por protocolo ou endereço..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        {statusFilters.map((filter) => {
          const count = filter.value === 'all' 
            ? mockProjetos.length 
            : statusCounts[filter.value] || 0;
          
          return (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                statusFilter === filter.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {filter.label}
              <Badge variant="secondary" className="ml-2 bg-background/20">
                {count}
              </Badge>
            </button>
          );
        })}
      </div>

      {/* Projects Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjetos.map((projeto, index) => (
            <div key={projeto.id} style={{ animationDelay: `${index * 50}ms` }}>
              <ProjectCard 
                projeto={projeto}
                onAnalyze={() => navigate('/analise/nova')}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="glass rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Protocolo</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tipo</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Endereço</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Data</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjetos.map((projeto, index) => {
                const statusConfig: Record<string, { label: string; className: string }> = {
                  pendente: { label: 'Pendente', className: 'bg-muted text-muted-foreground' },
                  em_analise: { label: 'Em Análise', className: 'bg-primary/20 text-primary' },
                  aprovado: { label: 'Aprovado', className: 'bg-success/20 text-success' },
                  reprovado: { label: 'Reprovado', className: 'bg-destructive/20 text-destructive' },
                  pendencias: { label: 'Pendências', className: 'bg-warning/20 text-warning' },
                };
                const status = statusConfig[projeto.status];

                return (
                  <tr 
                    key={projeto.id}
                    className="border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 30}ms` }}
                    onClick={() => navigate(`/analise/nova`)}
                  >
                    <td className="py-3 px-4">
                      <span className="font-medium text-foreground">#{projeto.protocolo}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-muted-foreground capitalize">{projeto.tipo}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-foreground">{projeto.endereco}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={cn("text-xs", status.className)}>
                        {status.label}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-muted-foreground text-sm">
                        {new Date(projeto.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
