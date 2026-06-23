import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const ROBUX_COIN = 'https://cdn.poehali.dev/projects/d26345eb-2489-4538-80c9-fe349862f29f/files/fcbc1ccf-f662-4ff5-9a29-6b1631122cad.jpg';

const AMOUNTS = [100, 400, 500, 800, 1000, 1700, 4500, 10000, 22500];

interface Tx {
  id: number;
  nick: string;
  amount: number;
  time: string;
}

const INITIAL_TX: Tx[] = [
  { id: 1, nick: 'Dimon_Pro2012', amount: 4500, time: '2 мин назад' },
  { id: 2, nick: 'xNightWolfx', amount: 800, time: '7 мин назад' },
  { id: 3, nick: 'KittyMeow_Roblox', amount: 1700, time: '14 мин назад' },
  { id: 4, nick: 'ProGamer_RUS', amount: 10000, time: '21 мин назад' },
  { id: 5, nick: 'Sasha2013', amount: 400, time: '35 мин назад' },
];

const STATS: [string, string][] = [
  ['128K', 'игроков'],
  ['4.9★', 'рейтинг'],
  ['24/7', 'онлайн'],
];

export default function Index() {
  const { toast } = useToast();
  const [balance, setBalance] = useState(2000000);
  const [nick, setNick] = useState('');
  const [amount, setAmount] = useState<number | null>(null);
  const [sending, setSending] = useState(false);
  const [history, setHistory] = useState<Tx[]>(INITIAL_TX);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDonate = () => {
    if (!nick.trim()) {
      toast({ title: 'Введите ник', description: 'Укажите ник игрока Roblox', variant: 'destructive' });
      return;
    }
    if (!amount) {
      toast({ title: 'Выберите сумму', description: 'Сколько робуксов задонатить?', variant: 'destructive' });
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setBalance((b) => Math.max(0, b - amount));
      setHistory((h) => [
        { id: Date.now(), nick: nick.trim(), amount, time: 'только что' },
        ...h,
      ]);
      toast({
        title: '✅ Робуксы отправлены!',
        description: `${amount.toLocaleString('ru-RU')} R$ → ${nick.trim()}`,
      });
      setNick('');
      setAmount(null);
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-background text-foreground grid-bg overflow-x-hidden">
      <div className="pointer-events-none fixed top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]" />
      <div className="pointer-events-none fixed bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-secondary/20 blur-[120px]" />

      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <nav className="container flex items-center justify-between h-16">
          <button onClick={() => scrollTo('top')} className="flex items-center gap-2">
            <img src={ROBUX_COIN} alt="logo" className="w-9 h-9 rounded-full neon-purple" />
            <span className="font-display text-xl tracking-wide">
              ROBO<span className="text-secondary text-glow-cyan">DONATE</span>
            </span>
          </button>
          <div className="hidden md:flex items-center gap-7 text-sm font-medium">
            <button onClick={() => scrollTo('top')} className="hover:text-secondary transition-colors">Главная</button>
            <button onClick={() => scrollTo('donate')} className="hover:text-secondary transition-colors">Донат</button>
            <button onClick={() => scrollTo('history')} className="hover:text-secondary transition-colors">История</button>
            <button onClick={() => scrollTo('about')} className="hover:text-secondary transition-colors">О сервисе</button>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-accent/40">
            <img src={ROBUX_COIN} alt="" className="w-5 h-5 rounded-full" />
            <span className="font-display text-sm text-accent text-glow-green">
              {balance.toLocaleString('ru-RU')}
            </span>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="container relative pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted border border-primary/40 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
              <span className="text-xs font-semibold text-muted-foreground">2 000 000 R$ в банке сервиса</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl leading-tight mb-5">
              ДОНАТ <span className="text-primary text-glow-purple">РОБУКСОВ</span><br />
              ПО НИКУ <span className="text-secondary text-glow-cyan">ROBLOX</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              Введи ник игрока, выбери сумму — и робуксы мгновенно улетят на аккаунт. Без пароля и входа.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={() => scrollTo('donate')}
                className="font-display tracking-wide bg-primary hover:bg-primary/90 text-primary-foreground neon-purple h-14 px-8 text-base"
              >
                <Icon name="Zap" className="mr-1" /> ЗАДОНАТИТЬ
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo('about')}
                className="h-14 px-8 text-base border-secondary/50 text-secondary hover:bg-secondary/10 hover:text-secondary"
              >
                Как это работает?
              </Button>
            </div>
            <div className="flex gap-8 mt-10">
              {STATS.map(([value, label]) => (
                <div key={label}>
                  <div className="font-display text-2xl text-secondary text-glow-cyan">{value}</div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-primary/30 blur-[80px] rounded-full" />
              <img src={ROBUX_COIN} alt="Robux" className="relative w-64 h-64 md:w-80 md:h-80 rounded-full neon-purple" />
            </div>
          </div>
        </div>
      </section>

      {/* DONATE */}
      <section id="donate" className="container py-16 md:py-20">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl mb-3">
            ОТПРАВИТЬ <span className="text-accent text-glow-green">РОБУКСЫ</span>
          </h2>
          <p className="text-muted-foreground">Всё займёт меньше минуты</p>
        </div>

        <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl p-6 md:p-8 neon-purple">
          <label className="block text-sm font-semibold mb-2 text-muted-foreground">
            Ник игрока Roblox
          </label>
          <div className="relative mb-7">
            <Icon name="User" className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={20} />
            <Input
              value={nick}
              onChange={(e) => setNick(e.target.value)}
              placeholder="Например: ProGamer_RUS"
              className="h-14 pl-12 text-base bg-input border-border focus-visible:ring-secondary"
            />
          </div>

          <label className="block text-sm font-semibold mb-3 text-muted-foreground">
            Сколько робуксов задонатить?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-7">
            {AMOUNTS.map((a) => (
              <button
                key={a}
                onClick={() => setAmount(a)}
                className={`relative flex flex-col items-center gap-1 py-4 rounded-xl border-2 transition-all ${
                  amount === a
                    ? 'border-accent bg-accent/10 neon-green'
                    : 'border-border bg-muted hover:border-secondary/60'
                }`}
              >
                <img src={ROBUX_COIN} alt="" className="w-7 h-7 rounded-full" />
                <span className="font-display text-lg">{a.toLocaleString('ru-RU')}</span>
                <span className="text-xs text-muted-foreground">R$</span>
              </button>
            ))}
          </div>

          <Button
            onClick={handleDonate}
            disabled={sending}
            className="w-full h-14 font-display tracking-wide text-base bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white neon-cyan"
          >
            {sending ? (
              <>
                <Icon name="Loader2" className="mr-2 animate-spin" /> ОТПРАВЛЯЕМ...
              </>
            ) : (
              <>
                <Icon name="Send" className="mr-2" /> ОТПРАВИТЬ РОБУКСЫ
              </>
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1">
            <Icon name="ShieldCheck" size={14} className="text-accent" /> Безопасно · без пароля · мгновенно
          </p>
        </div>
      </section>

      {/* HISTORY */}
      <section id="history" className="container py-16 md:py-20">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl mb-3">
            ИСТОРИЯ <span className="text-secondary text-glow-cyan">ТРАНЗАКЦИЙ</span>
          </h2>
          <p className="text-muted-foreground">Последние донаты игроков</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {history.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center gap-4 bg-card border border-border rounded-xl p-4 hover:border-secondary/50 transition-colors"
            >
              <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Icon name="User" className="text-primary" size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold truncate">{tx.nick}</div>
                <div className="text-xs text-muted-foreground">{tx.time}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-display text-accent text-glow-green flex items-center gap-1 justify-end">
                  +{tx.amount.toLocaleString('ru-RU')}
                  <img src={ROBUX_COIN} alt="" className="w-4 h-4 rounded-full" />
                </div>
                <div className="text-xs text-accent flex items-center gap-1 justify-end">
                  <Icon name="CheckCircle2" size={12} /> успешно
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="container py-16 md:py-20">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl mb-3">
            О <span className="text-primary text-glow-purple">СЕРВИСЕ</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            RoboDonate — быстрый способ отправить робуксы любому игроку Roblox прямо по нику
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {[
            { icon: 'Zap', color: 'text-secondary text-glow-cyan', t: 'Мгновенно', d: 'Робуксы приходят на аккаунт за пару секунд после отправки' },
            { icon: 'ShieldCheck', color: 'text-accent text-glow-green', t: 'Безопасно', d: 'Нам не нужен твой пароль — только ник игрока Roblox' },
            { icon: 'Headphones', color: 'text-primary text-glow-purple', t: 'Поддержка 24/7', d: 'Команда на связи круглосуточно и поможет с любым вопросом' },
          ].map((c) => (
            <div key={c.t} className="bg-card border border-border rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform">
              <div className="inline-flex w-14 h-14 rounded-xl bg-muted items-center justify-center mb-4">
                <Icon name={c.icon} className={c.color} size={28} />
              </div>
              <h3 className="font-display text-lg mb-2">{c.t}</h3>
              <p className="text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border mt-10">
        <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={ROBUX_COIN} alt="logo" className="w-7 h-7 rounded-full" />
            <span className="font-display tracking-wide">ROBO<span className="text-secondary">DONATE</span></span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            © 2026 RoboDonate. Не является официальным сервисом Roblox Corporation.
          </p>
        </div>
      </footer>
    </div>
  );
}