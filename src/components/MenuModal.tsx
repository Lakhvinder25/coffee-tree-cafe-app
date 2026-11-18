import React from 'react';
import { X, Coffee, Sparkles, Flame, Leaf, ArrowRight } from 'lucide-react';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBrew?: (brew: string) => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  onSelectBrew,
}) => {
  if (!isOpen) return null;

  const menuItems = [
    {
      category: 'Artisanal Roaster Reserve',
      items: [
        {
          name: 'Ethiopia Yirgacheffe G1 Natural',
          notes: 'Wild jasmine blossom, bergamot honey, ripe candied peach',
          price: '$6.50',
          badge: 'Pour Over',
          roast: 'Light City',
        },
        {
          name: 'Timber Hearth Velvet Espresso',
          notes: 'Molasses dark chocolate, roasted hazelnut, cedar smoke',
          price: '$4.75',
          badge: 'Double Shot',
          roast: 'Velvet Dark',
        },
        {
          name: 'Oat Milk Golden Cortado',
          notes: 'Equal parts extracted espresso & velvety steamed oat micro-foam',
          price: '$5.25',
          badge: 'Signature',
          roast: 'Medium Hearth',
        },
      ],
    },
    {
      category: 'Hearth Hearthside Bakehouse',
      items: [
        {
          name: 'Cinnamon Cardamom Brioche',
          notes: 'Flaky slow-fermented brioche twisted with freshly ground Ceylon cinnamon',
          price: '$5.50',
          badge: 'Free with Sign Up',
        },
        {
          name: 'Valrhona Dark Chocolate Croissant',
          notes: 'Triple laminated sourdough pastry with molten Valrhona batons',
          price: '$6.00',
          badge: 'Warm from Hearth',
        },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[85vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#183324] uppercase mb-1">
          <Coffee className="w-4 h-4 text-[#c89b65]" />
          <span>Coffee Tree Cafe Seasonal Harvest</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          Hearth Roasts & Bakery Offerings
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Roasted weekly in 15kg drum roasters using sustainable timber fires and clean hydroelectric energy.
        </p>

        <div className="space-y-6">
          {menuItems.map((sec) => (
            <div key={sec.category} className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5">
                {sec.category}
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {sec.items.map((item) => (
                  <div
                    key={item.name}
                    className="p-3.5 rounded-2xl bg-[#fbfbfa] border border-slate-200/80 hover:border-[#183324]/40 transition-colors flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-slate-900 text-sm">
                          {item.name}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#183324]/10 text-[#183324] text-[10px] font-semibold">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-snug">
                        {item.notes}
                      </p>
                    </div>
                    <span className="font-serif font-bold text-slate-900 text-sm shrink-0">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">Sign up or sign in to customize order ahead timing.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-[#183324] text-white font-medium hover:bg-[#12281c] cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
