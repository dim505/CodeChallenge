import { useEffect, useState } from "react";
import api from "../utils/api";
import Axios from "axios";
import Fade from "@mui/material/Fade";
import LinearProgress from "@mui/material/LinearProgress";



//lists departments and its members
export const DepartmentMembers = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      try {
        //this will hold all data and employees
        var Data = {};
        //map department ID to name
        var DeparmentMap = {};
        //gets departments
        const results = await api.listDepartments();

        var PromiseArr = [];
        //Gets a bunch of promises for the department members
        results.forEach((element) => {
          DeparmentMap[element.id] = element.name;
          var Promise1 = Axios.get(
            `${process.env.REACT_APP_API_HOST}/v1/departments/${element.id}`
          );
          PromiseArr.push(Promise1);
        });
        //holds members for curr department 
        var Row = [];
        var counters = 0;
        var DepartmentID;
        Promise.all(PromiseArr).then((values) => {
          Row = [];
          //builds out row
          values.forEach((value) => {
            value.data.forEach((result) => {
              Row.push(result.name);
              DepartmentID = result.departmentId;
            });
            //resolves department ID to name because API does not return department name
            Data[DeparmentMap[DepartmentID]] = Row;
            Row = [];
            counters += 1;
            //sets state once it reaches the end of the loop
            if (counters >= values.length) {
              setData(Data);
            }
          });
        });
      } catch (ex) {
        console.error(ex);
      }
    })();
  }, []);

  return (
    <Fade in={true}>
      <div>
        <h2>Department Per Member</h2>

        {Object.keys(data).length > 0 ? (
          Object.keys(data).map((element) => {
            return (
              <div key={Math.random()}>
                <h4> {element}</h4>
                <ul>
                  {data[element].map((DepartmentMember) => {
                    return <li key={Math.random()}>{DepartmentMember}</li>;
                  })}
                </ul>
              </div>
            );
          })
        ) : (
          <LinearProgress />
        )}
      </div>
    </Fade>
  );
};

export default DepartmentMembers;
