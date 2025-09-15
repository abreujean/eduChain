import React from 'react';
import { useXLMPrice } from '@/hooks/useXLMPrice';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface FiatWithXLMProps {
  amountBRL: number;
  className?: string;
}

export function FiatWithXLM({ amountBRL, className }: FiatWithXLMProps) {
  const { data: xlmPrice, isLoading, error } = useXLMPrice();

  const formatBRL = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const formatXLM = (amount: number) => {
    return amount.toFixed(4);
  };

  if (isLoading) {
    return (
      <div className={cn("space-y-1", className)}>
        <div className="text-2xl font-bold">{formatBRL(amountBRL)}</div>
        <Skeleton className="h-3 w-20" />
      </div>
    );
  }

  if (error || !xlmPrice) {
    return (
      <div className={cn("space-y-1", className)}>
        <div className="text-2xl font-bold">{formatBRL(amountBRL)}</div>
        <p className="text-xs text-muted-foreground">XLM indisponível</p>
      </div>
    );
  }

  const xlmAmount = amountBRL / xlmPrice;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("space-y-1 cursor-help", className)}>
            <div className="text-2xl font-bold">{formatBRL(amountBRL)}</div>
            <p className="text-xs text-muted-foreground">
              ≈ {formatXLM(xlmAmount)} XLM
            </p>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Cotação XLM: {formatBRL(xlmPrice)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}