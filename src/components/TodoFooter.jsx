export default function TodoFooter({ remaining }) {
  return (
    <div className='todo-footer'>
      <div className='todo-count'>Your remaining todos : {remaining}</div>
      <div className='todo-quote'>
        "When you lost something, God preparing you something better." - Rezky
        Desyafa
      </div>
    </div>
  );
}
