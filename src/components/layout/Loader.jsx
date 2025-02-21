import uiStore from "../../store/uiStore";

export default function Loader() {
  const isLoading = uiStore((state) => state.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-12 h-12 border-[6px] border-t-transparent border-primary border-solid rounded-full animate-spin"></div>
    </div>
  );
}
