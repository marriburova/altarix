import React from 'react';
import Button from './Button';
import InputMessage from './InputMessage';

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <form>
                    <InputMessage />
                    <Button />
                </form>
            </footer>
        );
    }

}

export default Footer;