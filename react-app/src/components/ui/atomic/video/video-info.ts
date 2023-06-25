import { styled } from '@mui/system';
import { textMixin } from '../../../../data/mixins/text-mixin.ts';

export const StyledVideoInfo = styled('header')(({ theme }) =>
    theme.unstable_sx({
        ...textMixin,

        maxWidth: 242,
        maxHeight: '3.2rem',
        lineHeight: '1.6rem',

        px: 0.2,

        fontWeight: 'fontWeight.normal',
        fontSize: 'fontSize.sm',
        fontStyle: 'italic',
        wordWrap: 'break-all',
        textOverflow: 'ellipsis',

        overflow: 'hidden',

        '&:first-of-type::after': {
            content: '""',

            display: 'inline-block',

            width: 6,
            height: 6,

            mx: 1,

            borderRadius: '50%',

            background: '#bdbdbd'
        }
    })
);
