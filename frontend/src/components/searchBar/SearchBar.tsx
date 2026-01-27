import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import {
  postSearchSchema,
  type PostSearchForm,
} from "@/validation/postSearch.validation";

const types = ["buy", "rent"] as const;

export default function SearchBar() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PostSearchForm>({
    resolver: zodResolver(postSearchSchema),
    defaultValues: {
      type: "buy",
      city: "",
      minPrice: undefined,
      maxPrice: undefined,
    },
  });
  console.log("error - ",errors)

  const type = watch("type");

  const onSubmit = (data: PostSearchForm) => {
    const params = new URLSearchParams();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.append(key, String(value));
      }
    });
    

    navigate(`/`);
  };

  const inputClass = `
    h-[52px]
    bg-white
    border border-gray-500
    rounded-xl
    px-3
    text-sm text-heading
    placeholder-muted
    focus:outline-none
    focus:ring-1
    focus:ring-dark/40
  `;

  return (
    <div className="mt-10 max-w-3xl">
      <div className="bg-dark/30 backdrop-blur-xl border border-borderGlass rounded-2xl shadow-2xl px-8 py-6">
        
        {/* BUY / RENT */}
        <div className="inline-flex gap-1 mb-5 bg-dark/60 p-1 rounded-2xl">
          {types.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setValue("type", t)}
              className={`px-6 py-2 rounded-xl text-sm font-semibold transition
                ${
                  type === t
                    ? "bg-white text-heading shadow-sm"
                    : "text-muted hover:text-white"
                }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_56px] gap-4"
        >
          {/* CITY */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-muted mb-1">
              City
            </label>
            <input
              type="text"
              placeholder="Ahmedabad"
              {...register("city")}
              className={inputClass}
            />
          </div>

          {/* MIN PRICE */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-muted mb-1">
              Min Price
            </label>
            <input
              type="number"
              placeholder="0"
              {...register("minPrice", {
                setValueAs: (v) => (v === "" ? undefined : Number(v)),
              })}
              className={inputClass}
            />
          </div>

          {/* MAX PRICE */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-muted mb-1">
              Max Price
            </label>
            <input
              type="number"
              placeholder="10,000,000"
              {...register("maxPrice", {
                setValueAs: (v) => (v === "" ? undefined : Number(v)),
              })}
              className={inputClass}
            />
          </div>

          {/* SEARCH */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-transparent mb-1">
              Search
            </label>

            <button
              type="submit"
              className="
                h-[52px] w-[56px]
                rounded-xl
                bg-dark
                text-white
                flex items-center justify-center
                hover:bg-dark/90
                transition
                shadow-md
                focus:outline-none
                focus:ring-1
              "
              aria-label="Search"
            >
              <Search size={18} />
            </button>
          </div>
        </form>

        {Object.keys(errors).length > 0 && (
          <div className="mt-4 rounded-xl bg-gray-200 px-4 py-3">
            <ul className="space-y-1 text-xs text-error">
              {Object.values(errors).map((error, index) => (
                <li key={index}>• {error?.message}</li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}
