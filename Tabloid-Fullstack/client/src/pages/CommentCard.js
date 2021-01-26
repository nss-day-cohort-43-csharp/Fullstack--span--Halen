import React, { useContext } from "react";
import { Col, Row, Button } from "reactstrap";
import formatDate from "../utils/dateFormatter";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const CommentCard = ({ comment, removeComment }) => {
    const { getToken, getCurrentUser } = useContext(UserProfileContext);

    const deleteComment = () => {
        const deletingComment = { id: comment.id }
        getToken().then((token) =>
            fetch(`/api/comment/${comment.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(deletingComment)
            }).then(() => {
                removeComment(comment.id);
            })
        )
    }

    const DeleteComment = () => {
        const user = getCurrentUser()
        if (user.id === comment.userProfileId) {
            return <Button
                className="mt-5"
                style={{ width: 150, height: 75 }}
                color="danger"
                onClick={() => {
                    deleteComment(comment.id)
                }}
            >Delete Comment
                    </Button>
        }
        else {
            return null;
        }
    }

    const EditButton = () => {
        const user = getCurrentUser()
        if (user.id === comment.userProfileId) {
            return <Button
                className="mt-5  mr-3"
                style={{ width: 150, height: 75 }}
                color="info"

            >Edit Comment
                    </Button>
        }
        else {
            return null;
        }
    }

    return <>
        <Col>
            <Row >
                <Col></Col>
                <Col md={5} className="text-left mt-5">
                    <div className="mt-2"><strong className="font-weight-bold">Subject:</strong>&nbsp; {comment.subject} </div>
                    <div className="mt-2"><strong className="font-weight-bold">Comment:</strong>&nbsp;   {comment.content}</div>
                    <div className="mt-2"><strong className="font-weight-bold">Author:</strong>&nbsp; {comment.userProfile.displayName}</div>
                    <div className="mt-2"> <strong className="font-weight-bold">Posted:</strong>&nbsp;  {formatDate(comment.createDateTime)} </div>
                </Col>
                <Col>
                    <EditButton />
                    <DeleteComment />
                </Col>
                <Col></Col>
            </Row>
        </Col>
    </>
}