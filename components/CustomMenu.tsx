import { Menu } from '@headlessui/react'
import Image from 'next/image';
import { Fragment } from 'react'

type Props = {
    title : string;
    state : string;
    filters : Array<string>;
    setState: (value: string) => void;
  }

const CustomMenu = ({title,state,filters,setState} : Props) => {
  return (
    <div className='flexStart flex-col gap-7 w-full relative'>
        <label htmlFor={title} className='w-full text-gray-100'>{title}</label>
        <Menu as='div' className='self-start relative'>
            <div>
                <Menu.Button className='flexCenter custom_menu-btn'>
                    {state || 'Select Category'}
                    <Image
                      src='/arrow-down.svg'
                      alt='Arrow down'
                      height={5}
                      width={10}
                    />
                </Menu.Button>
                <Menu.Items className='flexStart custom_menu-items'>
                    {
                        filters.map((tag)=>(
                            <Menu.Item key={tag}>
                                <button 
                                  type='button'
                                  value={tag}
                                  className='custom_menu-item'
                                  onClick={(e)=>setState(e.currentTarget.value)}
                                >
                                    {tag}
                                </button>
                            </Menu.Item>

                        )
                        )
                    }
                </Menu.Items>
            </div>
        </Menu>
    </div>
  )
}

export default CustomMenu