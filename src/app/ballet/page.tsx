'use client'

import Button from "~/components/Button";
import Modal from "./modal";
import { useState } from 'react';

interface StatusProps {
	hasLogged: () => void
	hasBeenClosedTimes: number
}
const Status = ({hasBeenClosedTimes, hasLogged}: StatusProps) => {
	return <div className="bg-green-600 p-2 mt-2 text-white flex gap-2">
		<button onClick={() => hasLogged()}>x</button>
		<p className="flex-1">Se ha cerrado el modal {hasBeenClosedTimes} veces</p>
	</div>
}

/* lambda functions 
c++ => lambda x: x + 2
Java => lambda x: x+2 
haskel => x : x + 2
js => (x) => x+2
php => function($x) { return $x + 2}
ruby => (v) { v + 2 }
*/

export default function Page() {
	const [open, setOpen] = useState(false)
	const [hasBeenClosed, setHasBeenClosed] = useState(false)
	const [hasBeenClosedTimes, setHasBeenClosedTimes] = useState(0)

	const onClose = (callback: () => void) => {
		callback()
		setOpen(() => false)
		setHasBeenClosed(true)
		setHasBeenClosedTimes((prev) => prev + 1)
	}
	const hasLogged = () => {
		setHasBeenClosed(false)
	}

	return <>
		<Button onClick={() => setOpen((prev) => !prev)} label="Open modal"/>
		<Modal open={open} close={onClose} />
		{hasBeenClosed && <Status hasBeenClosedTimes={hasBeenClosedTimes} hasLogged={hasLogged}/>}
	</>
}