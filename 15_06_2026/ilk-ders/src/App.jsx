import { useState } from 'react'
import Counter from './components/Counter';
import Toggle from './components/Toggle';
import Object from './components/Object';
import ArrayState from './components/ArrayState';
import MultipleInput from './components/MultipleInput';
import DynamicFormFields from './components/DynamicFormFields';


function App() {
  const [sayfa,setSayfa]=useState(1);

  const renderDemo=()=>{
    switch(sayfa){
      case 1:
        return <Counter/>;
        case 2:
        return <Toggle/>;
        case 3:
          return <Object/>;
        case 4:
          return <ArrayState/>;
          case 5:
            return <MultipleInput/>;
            case 6:
              return <DynamicFormFields/>;
      default:
        return <Counter/>;
    }
  }

  const demolar=[
    {id:1,ad:"Demo 1: Temel Counter"},
    {id:2,ad:"Demo 2: Toggle"},
    {id:3,ad:"Demo 3: Object"},
    {id:4,ad:"Demo 4: ToDoList"},
    {id:5,ad:"Demo 5: MultipleInput"},
    {id:6,ad:"Demo 6: DynamicFormFields"},

    
  ];


  return (
    <>
    <div className='p-4 md:p-6 bg-gray-100 min-h-screen'>
      <div className='border border-gray-200 rounded-2xl bg-white overflow-hidden shadow-lg'>
          <div className='p-5 bg-linear-to-r from-blue-600 to-indigo-700 flex flex-col sm:flex-row justify-between items-center gap-2'>
            <div>
              <h1 className='text-white text-xl font-bold'>React State & Form Yönetim Paneli</h1>
            </div>

          </div>
          <div className='grid grid-cols-1 md:grid-cols-4 min-h-\[600px]'>
            <div className='border-r border-gray-200 bg-gray-50'>
              <div className='sidebar-list p-4 space-y-1'>
                {demolar.map((demo)=>(
                  <button key={demo.id} onClick={()=>setSayfa(demo.id)} className='p-4 cursor-pointer border-r border-amber-500'>
                    {demo.ad}
                  </button>
                ))}
              </div>
            </div>

          </div>
          <div className='col-span-1 md:col-span-3 bg-white'>
            <div className='p-4 md:p-6'>
              {renderDemo()}
            </div>
          </div>
      </div>
    </div>
      
    </>
  )
}

export default App
