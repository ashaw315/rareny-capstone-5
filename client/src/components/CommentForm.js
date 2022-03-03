import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import FormField from "../styles/FormField";
import Label from "../styles/Label";
import Textarea from "../styles/TextArea";
import styled from "styled-components";

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

function CommentForm({ post, user }){
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState([]);
    const [comments, setComments] = useState([])

    const [isToggle, setIsToggle] = useState(true)

    function handleToggle() {
        setIsToggle((isToggle) => !isToggle)
      }

      useEffect(() => {
        fetch("/comments")
            .then((r) => r.json()
                .then((data) => setComments(data))
            );
    }, []);


      function handleSubmit(e) {
        e.preventDefault();
        fetch("/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                    body: body,
                    forum_post_id: post.id,
                    user_id: user.id,
            }),
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then((data) => setComments([data,...comments]))
                    // .then(navigate('/forums'))
                  } else {
                      r.json().then((err) => setErrors(err.errors));
                  }
                })
            };
      
    return (
        <div>
            <Button sx={{ color: "black", border: 1 }} onClick={handleToggle}>{isToggle ? "Add A Comment +" : "Add A Comment -"}</Button>
            {isToggle ? 
                null :
                <Wrapper>
                    <WrapperChild>
                        <form onSubmit={handleSubmit}>
                        <FormField>
                            <Label htmlFor="instructions">Post Text</Label>
                            <Textarea
                            id="instructions"
                            rows="5"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            />
                        </FormField>
                        <FormField>
                            <Button sx={{ color: "black", border: 1 }} type="submit">
                            Submit Comment
                            </Button>
                        </FormField>
                        <FormField>
                            {errors?.map((e)=><p key={e}>{e}</p>)}
                        </FormField>
                        </form>
                    </WrapperChild>
                </Wrapper> 
                }
            </div>   
    )
}

export default CommentForm;