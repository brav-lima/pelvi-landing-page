import { Calendar, CheckCircle2, Clock, TrendingUp } from "lucide-react";

export function DashboardMockup() {
  return (
    <div className="relative">
      {/* Soft blob */}
      <div className="absolute -inset-8 -z-10 bg-gradient-to-br from-primary/20 via-accent/40 to-secondary/15 blur-3xl rounded-[3rem]" />
      <div className="rounded-3xl bg-card shadow-soft border border-border/60 overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60 bg-muted/40">
          <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-secondary/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
          <span className="ml-3 text-xs text-muted-foreground">app.pelvi.com.br</span>
        </div>
        <div className="p-5 grid grid-cols-3 gap-4">
          {/* Left: agenda */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Quinta-feira</p>
                <h4 className="text-lg font-semibold">Agenda do dia</h4>
              </div>
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            {[
              { h: "08:30", n: "Camila R.", t: "Avaliação pélvica", c: "bg-primary/15 text-primary", s: "Confirmada" },
              { h: "10:00", n: "Beatriz L.", t: "Reabilitação · 5/10", c: "bg-secondary/20 text-secondary", s: "Pacote" },
              { h: "11:00", n: "Helena M.", t: "Biofeedback", c: "bg-accent text-accent-foreground", s: "Hoje" },
              { h: "14:30", n: "Júlia S.", t: "Pós-parto · 2/8", c: "bg-secondary/20 text-secondary", s: "Pacote" },
            ].map((a) => (
              <div key={a.h} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/40">
                <div className="text-xs font-medium text-muted-foreground w-12">{a.h}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{a.n}</p>
                  <p className="text-xs text-muted-foreground">{a.t}</p>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-full ${a.c}`}>{a.s}</span>
              </div>
            ))}
          </div>
          {/* Right: financial */}
          <div className="space-y-3">
            <div className="rounded-xl p-3 bg-primary text-primary-foreground">
              <div className="flex items-center justify-between">
                <span className="text-[10px] opacity-80">Recebido no mês</span>
                <TrendingUp className="h-3 w-3" />
              </div>
              <p className="text-xl font-semibold mt-1">R$ 12.480</p>
            </div>
            <div className="rounded-xl p-3 bg-muted/40 border border-border/40">
              <span className="text-[10px] text-muted-foreground">Pendente</span>
              <p className="text-lg font-semibold">R$ 1.940</p>
            </div>
            <div className="rounded-xl p-3 bg-muted/40 border border-border/40 space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle2 className="h-3 w-3 text-secondary" />
                <span>14 sessões realizadas</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>3 retornos amanhã</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}