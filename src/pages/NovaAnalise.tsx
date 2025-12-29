import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  FileText, 
  Image, 
  Table, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Building
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type AnalysisStep = 'upload' | 'processing' | 'review' | 'complete';

interface UploadedFile {
  id: string;
  name: string;
  type: 'planta' | 'planilha' | 'documento';
  status: 'pending' | 'uploaded' | 'analyzed' | 'error';
  size: string;
}

const requiredDocuments = [
  { type: 'planta', label: 'Planta Baixa', icon: Image },
  { type: 'planilha', label: 'Planilha de Metragens', icon: Table },
  { type: 'documento', label: 'Consulta de Viabilidade', icon: FileText },
  { type: 'documento', label: 'Consulta Ambiental', icon: FileText },
  { type: 'documento', label: 'Certidão Cadastral', icon: FileText },
];

export default function NovaAnalise() {
  const navigate = useNavigate();
  const [step, setStep] = useState<AnalysisStep>('upload');
  const [protocolo, setProtocolo] = useState('');
  const [endereco, setEndereco] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const handleFileUpload = (type: string) => {
    // Simulate file upload
    const newFile: UploadedFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: `${type}_${Date.now()}.pdf`,
      type: type as any,
      status: 'uploaded',
      size: '2.4 MB',
    };
    setUploadedFiles([...uploadedFiles, newFile]);
    toast.success(`Arquivo enviado com sucesso`);
  };

  const startAnalysis = async () => {
    if (!protocolo || !endereco) {
      toast.error('Preencha o protocolo e endereço');
      return;
    }

    setStep('processing');
    setIsAnalyzing(true);

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));

    setAnalysisResults({
      conformidade: 87,
      alertas: [
        { tipo: 'warning', mensagem: 'Recuo frontal abaixo do mínimo exigido (3m requerido, 2.5m encontrado)' },
        { tipo: 'info', mensagem: 'Taxa de ocupação dentro do limite (60% permitido, 55% utilizado)' },
        { tipo: 'success', mensagem: 'Altura máxima conforme Plano Diretor' },
      ],
      metragens: {
        areaTotal: '450.00 m²',
        areaPermitida: '480.00 m²',
        taxaOcupacao: '55%',
        coeficienteAproveitamento: '1.8',
      },
    });

    setIsAnalyzing(false);
    setStep('review');
  };

  const finishAnalysis = () => {
    setStep('complete');
    toast.success('Análise concluída com sucesso!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Nova Análise de Projeto
          </h1>
          <p className="text-muted-foreground mt-1">
            Faça upload dos documentos e inicie a análise com IA
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {[
          { key: 'upload', label: 'Upload' },
          { key: 'processing', label: 'Processando' },
          { key: 'review', label: 'Revisão' },
          { key: 'complete', label: 'Concluído' },
        ].map((s, index) => {
          const isActive = s.key === step;
          const isPast = ['upload', 'processing', 'review', 'complete'].indexOf(step) > index;
          
          return (
            <div key={s.key} className="flex items-center">
              <div className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                isActive && "bg-primary/10 text-primary",
                isPast && "text-success",
                !isActive && !isPast && "text-muted-foreground"
              )}>
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium border-2",
                  isActive && "border-primary bg-primary text-primary-foreground",
                  isPast && "border-success bg-success text-success-foreground",
                  !isActive && !isPast && "border-border"
                )}>
                  {isPast ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                </div>
                <span className="text-sm font-medium hidden sm:inline">{s.label}</span>
              </div>
              {index < 3 && (
                <div className={cn(
                  "w-8 lg:w-16 h-0.5 mx-2",
                  isPast ? "bg-success" : "bg-border"
                )} />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      {step === 'upload' && (
        <div className="space-y-6 animate-fade-in">
          {/* Project Info */}
          <div className="glass rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Informações do Projeto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Protocolo</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="2024-00000"
                    value={protocolo}
                    onChange={(e) => setProtocolo(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Endereço</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Rua, número - Bairro"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Document Upload */}
          <div className="glass rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Documentos Necessários</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requiredDocuments.map((doc) => {
                const isUploaded = uploadedFiles.some(f => f.type === doc.type);
                const DocIcon = doc.icon;
                
                return (
                  <div
                    key={doc.label}
                    className={cn(
                      "border-2 border-dashed rounded-xl p-4 transition-all cursor-pointer group",
                      isUploaded 
                        ? "border-success/50 bg-success/5" 
                        : "border-border hover:border-primary/50 hover:bg-primary/5"
                    )}
                    onClick={() => !isUploaded && handleFileUpload(doc.type)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        isUploaded ? "bg-success/10" : "bg-secondary"
                      )}>
                        {isUploaded ? (
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        ) : (
                          <DocIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={cn(
                          "text-sm font-medium",
                          isUploaded ? "text-success" : "text-foreground"
                        )}>
                          {doc.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {isUploaded ? 'Enviado' : 'Clique para enviar'}
                        </p>
                      </div>
                      {!isUploaded && (
                        <Upload className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Button 
            onClick={startAnalysis} 
            variant="gradient" 
            size="lg" 
            className="w-full"
            disabled={uploadedFiles.length < 2}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Iniciar Análise com IA
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}

      {step === 'processing' && (
        <div className="glass rounded-xl p-12 text-center space-y-6 animate-fade-in">
          <div className="w-20 h-20 rounded-full gradient-primary mx-auto flex items-center justify-center pulse-glow">
            <Loader2 className="w-10 h-10 text-primary-foreground animate-spin" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Analisando Documentos
            </h2>
            <p className="text-muted-foreground">
              A IA está verificando conformidade com o Plano Diretor e normativas...
            </p>
          </div>
          <div className="max-w-xs mx-auto space-y-2">
            {['Lendo planta baixa...', 'Verificando metragens...', 'Consultando normativas...'].map((text, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: `${i * 500}ms` }}>
                <Loader2 className="w-4 h-4 animate-spin" />
                {text}
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 'review' && analysisResults && (
        <div className="space-y-6 animate-fade-in">
          {/* Conformidade Score */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Índice de Conformidade</h2>
              <Badge className={cn(
                "text-lg px-4 py-1",
                analysisResults.conformidade >= 80 ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
              )}>
                {analysisResults.conformidade}%
              </Badge>
            </div>
            <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-1000",
                  analysisResults.conformidade >= 80 ? "bg-success" : "bg-warning"
                )}
                style={{ width: `${analysisResults.conformidade}%` }}
              />
            </div>
          </div>

          {/* Alerts */}
          <div className="glass rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Apontamentos da Análise</h2>
            <div className="space-y-3">
              {analysisResults.alertas.map((alerta: any, index: number) => (
                <div 
                  key={index}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg",
                    alerta.tipo === 'warning' && "bg-warning/10",
                    alerta.tipo === 'info' && "bg-primary/10",
                    alerta.tipo === 'success' && "bg-success/10"
                  )}
                >
                  <AlertCircle className={cn(
                    "w-5 h-5 mt-0.5 shrink-0",
                    alerta.tipo === 'warning' && "text-warning",
                    alerta.tipo === 'info' && "text-primary",
                    alerta.tipo === 'success' && "text-success"
                  )} />
                  <p className="text-sm text-foreground">{alerta.mensagem}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Metragens */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Metragens Verificadas</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(analysisResults.metragens).map(([key, value]) => (
                <div key={key} className="bg-secondary/50 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-lg font-semibold text-foreground">{value as string}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="secondary" size="lg" className="flex-1" onClick={() => setStep('upload')}>
              Voltar
            </Button>
            <Button variant="gradient" size="lg" className="flex-1" onClick={finishAnalysis}>
              Concluir Análise
            </Button>
          </div>
        </div>
      )}

      {step === 'complete' && (
        <div className="glass rounded-xl p-12 text-center space-y-6 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-success/20 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Análise Concluída!
            </h2>
            <p className="text-muted-foreground">
              O projeto foi analisado e o parecer técnico foi registrado no sistema.
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Button variant="secondary" onClick={() => navigate('/projetos')}>
              Ver Projetos
            </Button>
            <Button variant="gradient" onClick={() => {
              setStep('upload');
              setUploadedFiles([]);
              setProtocolo('');
              setEndereco('');
              setAnalysisResults(null);
            }}>
              Nova Análise
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
