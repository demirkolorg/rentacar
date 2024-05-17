import Button from '@/components/ui/Button';

const Yenile = ({ loading, getData }) => {
  return (
    <Button
      icon="heroicons-outline:refresh"
      text="Yenile"
      className="border dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-slate-500 hover:dark:border-slate-300 px-3 py-1.5 font-normal"
      iconClass={loading ? 'animate-spin ' : ''}
      onClick={() => {
        getData();
      }}
    />
  );
};
export default Yenile;
