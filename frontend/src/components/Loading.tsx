interface Props {}

export default function Loading(props: Props) {
  return (
    <div
      className={`w-4 h-4 border-b-2 border-white-900 rounded-full animate-spin mr-5`}
    ></div>
  );
}
