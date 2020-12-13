import React from 'react'
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import { FaArrowLeft } from 'react-icons/fa';

const HeaderForm = ({ title }) => {
    const history = useHistory();

    const goBack = () => {
        history.push('/');
    }

    return (
        <>
            <h1>{ title }</h1>
            <hr/>
            <div className="mb-3">
                <Button
                    color="danger"
                    onClick={ goBack }
                >
                    <FaArrowLeft /> Cancel
                </Button>
            </div>
        </>
    )
}

export default HeaderForm
