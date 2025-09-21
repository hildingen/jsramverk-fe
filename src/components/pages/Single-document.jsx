import React from 'react'
import { useParams } from "react-router-dom";

export default function SingleDocument() {
    let { id } = useParams();
    console.log(id);
    
  return (
    <div>SingleDocument</div>
  )
}
