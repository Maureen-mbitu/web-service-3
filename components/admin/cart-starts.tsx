import { Card, CardContent } from "@/components/ui/card";
import React, { ReactNode } from "react";

interface CardStatProps {
  title: string;
  value?: string;
  subtitle?: string;
  bgColor?: string;
  subtitleColor?: string;
  chart?: ReactNode;
  children?: ReactNode; 
}

export default function CardStat({
  title,
  value,
  subtitle,
  bgColor = "bg-white",
  subtitleColor = "text-[#2e7d32]",
  chart,
  children,
}: CardStatProps) {
  const hasChildren = React.Children.count(children) > 0;
  const hasChart = !!chart;

  return (
    <Card className={`${bgColor} shadow-sm rounded-lg p-6`}>
      {hasChildren ? (
        <div className="flex flex-col  gap-1">
          <h4 className="text-[#666666] text-sm font-normal p-0">{title}</h4>
          <CardContent className="p-0">{children}</CardContent>
        </div>
      ) : hasChart ? (
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h4 className="text-[#666666] text-sm font-normal mb-2">{title}</h4>
            {value && <div className="text-4xl font-bold text-[#2c2a29]">{value}</div>}
          </div>
          <div className="flex flex-col-reverse items-end">
            {subtitle && (
              <div className={`${subtitleColor} text-sm mb-2`}>{subtitle}</div>
            )}
            <div className="w-24 h-16">{chart}</div>
          </div>
        </div>
      ) : (
        <>
          <h4 className="text-[#666666] text-sm font-normal mb-2">{title}</h4>
          <CardContent className="p-0">
            {value && <div className="text-4xl font-bold text-[#2c2a29] mb-1">{value}</div>}
            {subtitle && <div className={`${subtitleColor} text-sm`}>{subtitle}</div>}
          </CardContent>
        </>
      )}
    </Card>
  );
}
