enum Effects {
  Parade,
  Perce_parade,
  Imparable,
  Esquive,
  Inesquivable,
  Imprévisible,
  Rapide,
  Cancel,
  Allonge, 
  Stun
}

export interface Spell {
  cooldown: number;
  name: string;
  damage: string;
  prana: number;
  pa: number;
  effect: Effects;
  passive: boolean;
}
