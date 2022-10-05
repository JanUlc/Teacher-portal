import React from 'react';
import { Button } from 'components/atoms/Button/Button';
import Note from 'components/molecules/Note/Note';
import { useAddNotesMutation, useGetNotesQuery } from 'store';
import { NotesWrapper, StyledFormField, Wrapper } from 'views/Notes.styles';
import { useForm } from 'react-hook-form';

const Notes = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data, isLoading } = useGetNotesQuery();
  const [addNote] = useAddNotesMutation();

  const handleAddNote = ({ title, content }) => {
    addNote({ title, content });
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(handleAddNote)}>
        <StyledFormField {...register('title', { required: true })} label="Title" name="title" id="title" />
        <StyledFormField {...register('content', { required: true })} isTextarea label="Content" name="content" id="content" />
        {errors.title && <span>Title is required</span>}
        {errors.content && <span>Content is required</span>}
        <Button type="submit">Add</Button>
      </form>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <NotesWrapper>
          {data.notes.length ? (
            data.notes.map(({ title, content, id }) => <Note id={id} key={id} title={title} content={content} />)
          ) : (
            <p>Create your first note</p>
          )}
        </NotesWrapper>
      )}
    </Wrapper>
  );
};

export default Notes;
