import type {
    ButtonHTMLAttributes,
    ReactNode,
  } from "react";
  import clsx from "clsx";
  import {Spinner} from "@/components/ui/Spinner";
  
  interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    loading?: boolean;
    loadingText?: string;
  }
  
  export const Button = ({
    children,
    loading = false,
    loadingText,
    disabled,
    className,
    ...props
  }: ButtonProps) => {
    const isDisabled = disabled || loading;
  
    return (
      <button
        {...props}
        disabled={isDisabled}
        aria-busy={loading}
        className={clsx(
          `
            w-full rounded-xl py-3 font-semibold transition
            bg-wooden text-gray-800
            hover:opacity-90
            disabled:bg-[#E1D9BC]
            disabled:text-gray-500
            disabled:cursor-not-allowed
          `,
          className
        )}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <Spinner />
            <span>{loadingText ?? "Loading..."}</span>
          </div>
        ) : (
          children
        )}
      </button>
    );
  };
  
  