import React from 'react'
import Sheets from './Sheets'

const SheetList = props => {
  console.log(props);
  var sheets = props.list.cheatsheets.map((sheet, index) => {
    return <Sheets id={sheet.id}
                key={index}
                name={sheet.name}
                snippet={sheet.snippet}
                description={sheet.description}
                deleteCheatsheet={props.deleteCheatsheet}
                getEditId={props.getEditId}/>
  })
  return (
    <section>
      <ul id="cheetsheets">
        {sheets}
      </ul>
    </section>
  )
}

export default SheetList;
