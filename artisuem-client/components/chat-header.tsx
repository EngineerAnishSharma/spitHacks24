import { FC } from 'react'

const ChatHeader: FC = () => {
  return (
    <div className='w-full flex gap-3 justify-start items-center text-primary-focus'>
      <div className='flex flex-col items-start text-sm'>
        <p className='text-xs'>Chat with</p>
        <div className='flex gap-1.5 items-center'>
          <p className='w-2 h-2 rounded-full bg-green-500' />
          <p className='font-medium'>E-commerce support</p>
        </div>
      </div>
    </div>
  )
}

export default ChatHeader