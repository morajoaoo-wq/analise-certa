import { CheckCircle2, Circle, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tarefa } from '@/types';

interface TaskListProps {
  tasks: Tarefa[];
  onToggleTask?: (taskId: string) => void;
}

const prioridadeConfig = {
  baixa: { icon: Circle, className: 'text-muted-foreground' },
  media: { icon: Clock, className: 'text-warning' },
  alta: { icon: AlertTriangle, className: 'text-destructive' },
};

export function TaskList({ tasks, onToggleTask }: TaskListProps) {
  return (
    <div className="space-y-2">
      {tasks.map((task, index) => {
        const prioridade = prioridadeConfig[task.prioridade];
        const PrioridadeIcon = prioridade.icon;
        const isCompleted = task.status === 'concluida';

        return (
          <div
            key={task.id}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer group",
              isCompleted ? "bg-secondary/30" : "bg-secondary/50 hover:bg-secondary",
              "animate-fade-in"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => onToggleTask?.(task.id)}
          >
            <button className="shrink-0">
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-success" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              )}
            </button>
            
            <div className="flex-1 min-w-0">
              <p className={cn(
                "text-sm font-medium truncate",
                isCompleted ? "text-muted-foreground line-through" : "text-foreground"
              )}>
                {task.titulo}
              </p>
              {task.projeto_id && (
                <p className="text-xs text-muted-foreground">Projeto vinculado</p>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <PrioridadeIcon className={cn("w-4 h-4", prioridade.className)} />
              <span className="text-xs text-muted-foreground">
                {new Date(task.data_limite).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
