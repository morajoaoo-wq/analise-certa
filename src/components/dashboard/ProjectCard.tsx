import { Clock, MapPin, User, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Projeto } from '@/types';

interface ProjectCardProps {
  projeto: Projeto;
  onAnalyze?: () => void;
}

const statusConfig = {
  pendente: { label: 'Pendente', variant: 'secondary' as const, className: 'bg-muted text-muted-foreground' },
  em_analise: { label: 'Em Análise', variant: 'default' as const, className: 'bg-primary/20 text-primary' },
  aprovado: { label: 'Aprovado', variant: 'default' as const, className: 'bg-success/20 text-success' },
  reprovado: { label: 'Reprovado', variant: 'destructive' as const, className: 'bg-destructive/20 text-destructive' },
  pendencias: { label: 'Pendências', variant: 'default' as const, className: 'bg-warning/20 text-warning' },
};

const tipoConfig = {
  residencial: 'Residencial',
  comercial: 'Comercial',
  industrial: 'Industrial',
  misto: 'Misto',
};

export function ProjectCard({ projeto, onAnalyze }: ProjectCardProps) {
  const status = statusConfig[projeto.status];
  
  return (
    <div className="glass rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:border-primary/20 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-muted-foreground">#{projeto.protocolo}</span>
            <Badge className={cn("text-xs", status.className)}>
              {status.label}
            </Badge>
          </div>
          <h3 className="font-semibold text-foreground">{tipoConfig[projeto.tipo]}</h3>
        </div>
        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
          <FileText className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{projeto.endereco}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{new Date(projeto.created_at).toLocaleDateString('pt-BR')}</span>
        </div>
        {projeto.analista_id && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            <span>Analista atribuído</span>
          </div>
        )}
      </div>

      {projeto.status === 'pendente' && onAnalyze && (
        <Button onClick={onAnalyze} className="w-full" variant="gradient" size="sm">
          Iniciar Análise
        </Button>
      )}
      {projeto.status === 'em_analise' && (
        <Button className="w-full" variant="secondary" size="sm">
          Continuar Análise
        </Button>
      )}
    </div>
  );
}
