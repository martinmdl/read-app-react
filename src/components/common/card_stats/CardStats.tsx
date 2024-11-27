import { SvgIconTypeMap, Typography } from "@mui/material"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import Card from '@mui/material/Card';

export const CardStats = ({ title, Icon, amount }: CardStatsProps) => {
    return (
        <Card variant="outlined" sx={{ display:'flex', alignItems:'center', height:'5rem', padding:'1rem' }}>
            <Icon style={{ fontSize: '2.5rem', margin:'0 0.5rem 0 0' }} />
            <Typography variant='subtitle1'>{title}</Typography>  
            <Typography data-testid={title} variant='h4' sx={{ marginLeft: 'auto' }}>{amount}</Typography>
        </Card>
    )
}

type CardStatsProps = {
    title: string;
    Icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>>;
    amount: number;
};
