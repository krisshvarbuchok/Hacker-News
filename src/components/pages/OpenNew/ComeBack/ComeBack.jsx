import styles from './comeBack.module.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cleverOpenNew } from '../../../../redux/slices/OpenNewSlice';


const ComeBack = () => {
    const navigate = useNavigate();
    const dispach = useDispatch();
    const handleClick = () => {
        navigate('/');
        dispach(cleverOpenNew());
    }
    return (

        <Stack direction="row" spacing={1}
            className={styles.buttonComeBack}
            onClick={() => handleClick()}
        >
            <IconButton
                sx={{ color: 'black', '&:hover': { color: '#ff6600' } }}
                aria-label="Go back to news"
            >
                <ArrowBackIosNewIcon />
            </IconButton>
        </Stack>
    )
}
export default ComeBack;