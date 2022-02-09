import { useEffect, useState } from "react"
import { Department } from "../models/Models"
import api from "../utils/api"
import Fade from '@mui/material/Fade';
import LinearProgress from '@mui/material/LinearProgress';

export const DepartmentList = () => {
	const [departments, setDepartments] = useState<Department[]|undefined>()


	useEffect(() => {

		(async () => {
			try {
				setDepartments(await api.listDepartments())
			}
			catch (ex) {
				console.error(ex)
			}
		})()

	}, [])


	if (!departments) {
		return <LinearProgress />
	}
	else if (departments.length === 0) {
		return <p>No departments</p>
	}

  	return (<Fade in={true}>
			<div>	
		<h2>Department List</h2>
		<ul>
			{departments.map(d => <li>{d.name}</li>)}
		</ul>
		</div>
		</Fade>
	 
	)
}