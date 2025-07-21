"use client";
import React from "react";
import clsx from "clsx";
import { ArrowRightIcon } from "../icons/arrowRightIcon";

type PageContainerVariant = "highlight" | "sectioned" | "form";

type PageContainerProps = {
  children?: React.ReactNode;
  className?: string;
  bgColor?: string;
  withBackgroundPattern?: boolean;
  variant?: PageContainerVariant;
  title?: string;
  subtitle?: string;
};

export function PageContainer({
  children,
  className = "",
  bgColor = "bg-white",
  withBackgroundPattern = false,
  variant,
  title,
  subtitle,
}: PageContainerProps) {
  const baseClasses = "relative p-4 sm:p-6";

  const variantClasses = {
    highlight: clsx(
      "w-full sm:w-[1200px] min-h-[280px] sm:h-[314px] rounded-[16px] text-white flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0 sm:p-10 p-6",
      "bg-gradient-to-r from-brandSecondary to-brandPrimary",
      "relative overflow-hidden"
    ),
    sectioned: clsx(
      "bg-white/60 shadow-md rounded-xl p-4 sm:p-6",
      "flex flex-col gap-md"
    ),
    form: clsx("bg-backgroundPrimary rounded-xl p-4 sm:p-6 shadow-md"),
  };

  const renderHighlight = () => (
    <div className="flex flex-col gap-sm z-10 max-w-full sm:max-w-[600px]">
      <h1 className="text-xl sm:text-h1 font-bold text-backgroundPrimary font-jakarta">
        Olá, {title}!
      </h1>
      <p className="text-base sm:text-h4 text-backgroundPrimary font-jakarta -mt-2">
        Bem-vindo(a) de volta
      </p>
      <p className="text-sm sm:text-md text-backgroundPrimary mt-sm font-jakarta">
        Este é o resumo da sua vida financeira.
      </p>
  
      {/* Versão mobile: valor em uma linha separada */}
      <div className="block sm:hidden mt-2">
        <p className="text-sm text-backgroundPrimary font-jakarta">
          Seu saldo atual é
        </p>
        <p className="text-[28px] font-bold text-feedbackSuccess font-jakarta">
          {subtitle}
        </p>
      </div>
  
      {/* Versão desktop: valor na mesma linha */}
      <p className="hidden sm:block text-sm text-backgroundPrimary font-jakarta">
        Seu saldo atual é{" "}
        <span className="text-feedbackSuccess font-bold text-[36px] font-jakarta">
          {subtitle}
        </span>
      </p>
    </div>
  );
  

  const backgroundNoise = (
    <div className="absolute inset-0 z-0 opacity-50 bg-[url('/Noise.png')] bg-cover bg-center pointer-events-none" />
  );

  const highlightImage = (
    <img
      src="/undraw_finance_m6vw 1.png"
      alt="Gráfico decorativo"
      className="hidden sm:block absolute right-10 bottom-0 h-full z-10"
    />
  );

  return (
    <div
      className={clsx(
        baseClasses,
        variant ? variantClasses[variant] : "",
        !variant && bgColor,
        className
      )}
    >
      {variant === "highlight" && (
        <>
          {backgroundNoise}
          {highlightImage}
          {renderHighlight()}
        </>
      )}

      {variant === "sectioned" ? (
        <>
         <div className="mb-md">
  {/* Título */}
  {title && (
    <h2 className="text-base sm:text-h5 font-bold text-textPrimary mb-1">{title}</h2>
  )}

  {/* Subtitle - mobile */}
  {subtitle && (
    <div className="block sm:hidden">
      <a
        href="#"
        className="flex items-center gap-xxs text-sm text-brandPrimary font-inter"
      >
        <span className="hover:underline">{subtitle}</span>
        <span className="inline-flex w-4 h-4 items-center justify-center group-hover:no-underline">
          <ArrowRightIcon
            className="text-brandPrimary text-base"
            bgColor="bg-transparent"
          />
        </span>
      </a>
    </div>
  )}

  {/* Subtitle - desktop */}
  {subtitle && (
    <div className="hidden sm:flex justify-between items-center">
      <div />
      <a
        href="#"
        className="flex items-center gap-xxs text-sm text-brandPrimary font-inter"
      >
        <span className="hover:underline">{subtitle}</span>
        <span className="inline-flex w-4 h-4 items-center justify-center group-hover:no-underline">
          <ArrowRightIcon
            className="text-brandPrimary text-base"
            bgColor="bg-transparent"
          />
        </span>
      </a>
    </div>
  )}
</div>



          <div className="bg-backgroundPrimary rounded-lg p-4 overflow-x-auto">
            <div className="hidden sm:grid grid-cols-4 items-center text-sm font-semibold text-textPrimary mb-sm px-sm min-w-[560px]">
              <span>Transação</span>
              <span>Data</span>
              <span>Valor (R$)</span>
              <span>Ações</span>
            </div>
            {children}
          </div>
        </>
      ) : variant !== "highlight" ? (
        <>
          {title && <h2 className="text-h5 font-bold mb-4">{title}</h2>}
          {children}
        </>
      ) : null}
    </div>
  );
}
