import React, { useState } from 'react'
import {Box, Collapse, List} from '@mui/material'

const PreviousYear = () => {
  const [show, setshow] = useState(false)
  return (
    <div>
        <h1>Hello</h1>
        <Box sx={{ mt: 1 }}>
          list item component and we pass content to that
        <List>
          <Collapse orientation='vertical' in={!show}>
          {show?'items':''}click
          </Collapse>
        </List>
        </Box>
    </div>
  )
}

export default PreviousYear