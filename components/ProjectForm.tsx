'use client'

import { ProjectInterface, SessionInterface } from '@/common.types'
import React, { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import FormField from './FormField'
import { categoryFilters } from '@/constant'
import CustomMenu from './CustomMenu'
import Button from './Button'
import { useRouter } from 'next/navigation'
import { createNewProject, editProject, fetchToken } from '@/lib/actions'

type Props = {
    type: string,
    session : SessionInterface,
    project? : ProjectInterface
}
const ProjectForm = ({type , session, project}: Props) => {
    const route = useRouter();
    const [form, setForm] = useState({
        image : project?.image || '',
        title : project?.title || '',
        description : project?.description || '',
        liveSiteUrl : project?.liveSiteUrl || '',
        githubUrl : project?.githubUrl || '',
        category : project?.category || ''
    });
    const handleFormSubmit = async (e: React.FormEvent)=>{
        e.preventDefault();
        setIssubmitting(true);

        const {token} = await fetchToken();

        try {
            if(type === 'create'){
                await createNewProject(form,session?.user?.id,token);

                route.push('/');
            }

            if(type === 'edit'){
                await editProject(project?.id as string, form, token);

                route.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIssubmitting(false)
        }
    }

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const file = e.target.files?.[0];

        if(!file) return;

        if(!file.type.includes('image')){
            return alert('Please upload an image');
        }

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () =>{
            const result = reader.result as string;

            handleStateChange('image', result)
        }
    };

    const handleStateChange = (fieldName : string , value : string) =>{
        setForm((prevForm)=>({
            ...prevForm, [fieldName] : value
        }))
    }

    const [isSubmitting, setIssubmitting] = useState(false);


  return (
    <form 
       onSubmit={handleFormSubmit}
       className='flexStart form'
    >
        <div className='flexStart form_image-container'>
            <label htmlFor="poster" className='flexCenter form_image-label'>
                {!form.image && 'Choose a poster for your project'}
            </label>
            <input id='image' type="file" accept='image/*' required={type === 'type'} className='form_image-input' onChange={handleChangeImage} />
            {
                form.image && (
                    <Image src={form?.image} alt='poster' className='sm:p-10 object-contain z-20' fill />
                )
            }
        </div>
        <FormField title="Title" state={form.title} placeholder='Flexibble' setState={(value) => handleStateChange('title',value)} />
        <FormField title="Description" state={form.description} isTextArea placeholder='Showcase and discover remarkable devoloper projects' setState={(value) => handleStateChange('description',value)} />
        <FormField type='url' title="Website URL" state={form.liveSiteUrl} placeholder='https://jsmastery.pro' setState={(value) => handleStateChange('liveSiteUrl',value)} />
        <FormField type='url' title="GitHub URL" state={form.githubUrl} placeholder='https://www.github.com/sofianeazri' setState={(value) => handleStateChange('githubUrl',value)} />
        <CustomMenu title="category" filters={categoryFilters} state={form.category} setState={(value) => handleStateChange('category',value)} />
        <div className='flexStart w-full'>
            <Button title={isSubmitting ? `${type === 'create' ? 'Creating' : 'Editing'}` : `${type === 'create' ? 'Create' : 'Edit'}`} type='submit' rightIcon={isSubmitting ? '' : '/plus.svg'} isSubmitting={isSubmitting} />
        </div>

    </form>
  )
}

export default ProjectForm