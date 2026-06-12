import { useState } from "react";
import Demo1JSXBasic from "./component/Demo1JSXBasic";
import Demo2Component from "./component/Demo2Component";
import Demo3PropsBasic from "./component/Demo3PropBasic";
import Demo5Rendering from "./component/Demo5Rendering";
import Demo4PropsChildren from "./component/Demo4PropsChildren";
import Demo6ListRendering from "./component/Demo6ListRendering";
import Demo7EventHanding from "./component/Demo7EventHanding";
import Demo8ReadOnlyProps from "./component/Demo8ReadOnlyProps";
import Demo9DefaultProps from "./component/Demo9DefaultProps";

function App() {
  const [selectedDemo, setSelectedDemo] = useState(1);

  const renderDemo = () => {
    switch (selectedDemo) {
      case 1:
        return <Demo1JSXBasic />;
      case 2:
        return <Demo2Component />;
      case 3:
        return <Demo3PropsBasic />;
      case 4:
        return <Demo4PropsChildren />;
      case 5:
        return <Demo5Rendering />;
      case 6:
        return <Demo6ListRendering />;
      case 7:
        return <Demo7EventHanding />;

      case 8:
        return <Demo8ReadOnlyProps />;

         case 9:
        return <Demo9DefaultProps />;

      default:
        return <Demo1JSXBasic />;
    }
  };

  const demolar = [
    { id: 1, ad: "Demo 1: Temel Jsx" },
    { id: 2, ad: "Demo 2: Bileşenler" },
    { id: 3, ad: "Demo 3 Props" },
    { id: 4, ad: "Demo 4: Props Children" },
    { id: 5, ad: "Demo 5: Koşullu Render" },
    { id: 6, ad: "Demo 6: Listeleme ve Key" },
    { id: 7, ad: "Demo 7: Onay Yönetimi" },
    { id: 8, ad: "Demo 8: Salt Okunur" },
    { id: 9, ad: "Demo 9: Varsayılan Props" },
  ];

  return (
    <>
      <div className="p-4">
        <div className="border">
          <div className="p-4 bg-orange-600">
            <h1 className="text-white text-xl">React ve Props Paneli</h1>
          </div>
          <div className="grid grid-cols-4">
            <div className="border-r">
              <div className="sidebar-list">
                {demolar.map((demo) => {
                  return (
                    <button
                      key={demo.id}
                      onClick={() => setSelectedDemo(demo.id)}
                      className={
                        selectedDemo === demo.id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }
                    >
                      {demo.ad}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="col-span-3">
              <div className="p-4">{renderDemo()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
