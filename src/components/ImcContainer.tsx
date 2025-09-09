import ImcResult from './ImcResult'
import ImcHistory from './ImcHistory'
import { ImcProvider } from './ImcProvider'
import ImcForm from './ImcForm'

function ImcContainer() {
  return (
    <>
      <ImcProvider>
        <ImcForm />
        <ImcResult />
      </ImcProvider>
      <ImcHistory />
    </>
  )
}

export default ImcContainer