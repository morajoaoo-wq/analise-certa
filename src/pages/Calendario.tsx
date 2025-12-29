import { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Tarefa } from '@/types';

// Mock tasks data
const mockTarefas: Tarefa[] = [
  {
    id: '1',
    user_id: '3',
    titulo: 'Revisar projeto #2024-00145',
    projeto_id: '1',
    data_limite: new Date().toISOString(),
    status: 'pendente',
    prioridade: 'alta',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    user_id: '3',
    titulo: 'Emitir parecer técnico',
    projeto_id: '2',
    data_limite: new Date(Date.now() + 86400000).toISOString(),
    status: 'em_andamento',
    prioridade: 'media',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    user_id: '3',
    titulo: 'Verificar documentação ambiental',
    data_limite: new Date(Date.now() + 172800000).toISOString(),
    status: 'pendente',
    prioridade: 'baixa',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    user_id: '3',
    titulo: 'Reunião com equipe',
    data_limite: new Date(Date.now() + 259200000).toISOString(),
    status: 'pendente',
    prioridade: 'media',
    created_at: new Date().toISOString(),
  },
];

const prioridadeConfig = {
  baixa: { label: 'Baixa', className: 'bg-muted text-muted-foreground' },
  media: { label: 'Média', className: 'bg-warning/20 text-warning' },
  alta: { label: 'Alta', className: 'bg-destructive/20 text-destructive' },
};

const statusConfig = {
  pendente: { label: 'Pendente', icon: Clock },
  em_andamento: { label: 'Em Andamento', icon: AlertTriangle },
  concluida: { label: 'Concluída', icon: CheckCircle2 },
};

export default function Calendario() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getTasksForDate = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return mockTarefas.filter(t => {
      const taskDate = new Date(t.data_limite);
      return taskDate.toDateString() === date.toDateString();
    });
  };

  const selectedDateTasks = selectedDate 
    ? mockTarefas.filter(t => {
        const taskDate = new Date(t.data_limite);
        return taskDate.toDateString() === selectedDate.toDateString();
      })
    : [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Calendário
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie seus prazos e tarefas
          </p>
        </div>
        <Button variant="gradient">
          <Plus className="w-4 h-4 mr-2" />
          Nova Tarefa
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 glass rounded-xl p-6">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="icon" onClick={prevMonth}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-lg font-semibold text-foreground">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <Button variant="ghost" size="icon" onClick={nextMonth}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Days of month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              const isToday = date.toDateString() === new Date().toDateString();
              const isSelected = selectedDate?.toDateString() === date.toDateString();
              const tasks = getTasksForDate(day);
              const hasHighPriority = tasks.some(t => t.prioridade === 'alta');

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(date)}
                  className={cn(
                    "aspect-square rounded-lg flex flex-col items-center justify-center relative transition-all",
                    isToday && "ring-2 ring-primary",
                    isSelected && "bg-primary text-primary-foreground",
                    !isSelected && "hover:bg-secondary",
                  )}
                >
                  <span className={cn(
                    "text-sm font-medium",
                    !isSelected && isToday && "text-primary"
                  )}>
                    {day}
                  </span>
                  {tasks.length > 0 && (
                    <div className="absolute bottom-1 flex gap-0.5">
                      {tasks.slice(0, 3).map((_, idx) => (
                        <div 
                          key={idx}
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            isSelected ? "bg-primary-foreground" : hasHighPriority ? "bg-destructive" : "bg-primary"
                          )}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tasks for Selected Date */}
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {selectedDate ? (
              <>
                Tarefas para {selectedDate.toLocaleDateString('pt-BR', { 
                  day: 'numeric', 
                  month: 'long' 
                })}
              </>
            ) : (
              'Selecione uma data'
            )}
          </h3>

          {selectedDateTasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Nenhuma tarefa para esta data</p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedDateTasks.map((task) => {
                const prioridade = prioridadeConfig[task.prioridade];
                const status = statusConfig[task.status];
                const StatusIcon = status.icon;

                return (
                  <div 
                    key={task.id}
                    className="p-4 bg-secondary/50 rounded-lg space-y-2 animate-fade-in"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-foreground">{task.titulo}</p>
                      <Badge className={cn("text-xs shrink-0", prioridade.className)}>
                        {prioridade.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <StatusIcon className="w-3.5 h-3.5" />
                      <span>{status.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Próximas Tarefas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockTarefas.map((task, index) => {
            const prioridade = prioridadeConfig[task.prioridade];
            const daysUntil = Math.ceil((new Date(task.data_limite).getTime() - Date.now()) / 86400000);

            return (
              <div 
                key={task.id}
                className="p-4 bg-secondary/50 rounded-lg space-y-3 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between">
                  <Badge className={cn("text-xs", prioridade.className)}>
                    {prioridade.label}
                  </Badge>
                  <span className={cn(
                    "text-xs font-medium",
                    daysUntil <= 1 ? "text-destructive" : "text-muted-foreground"
                  )}>
                    {daysUntil === 0 ? 'Hoje' : daysUntil === 1 ? 'Amanhã' : `${daysUntil} dias`}
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground line-clamp-2">{task.titulo}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(task.data_limite).toLocaleDateString('pt-BR', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short'
                  })}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
