import plusIcon from '@assets/img/plus-icon.svg';
import httpClient from '@http-client';
import { FormControl } from '@mui/base';
import { styled } from '@mui/system';
import { StyledButton } from '@pages/popup/components/shared/button';
import { StyledIcon } from '@pages/popup/components/shared/icon';
import StyledInput from '@pages/popup/components/shared/input';
import useValidate from '@hooks/use-validate';
import queryClient, { useMutation } from '@query-client';
import urls from '@utils/endpoints/urls';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const StyledForm = styled('form')(({ theme }) =>
  theme.unstable_sx({
    display: 'flex',
    alignItems: 'start',
    gap: 1,

    width: '100%',
  }),
);

const StyledSubmitButton = styled(StyledButton)(({ theme }) =>
  theme.unstable_sx({
    display: 'grid',
    placeItems: 'center',

    height: 'auto',

    p: 0.75,

    backgroundColor: 'background.purple',

    borderRadius: 1,

    transition: '0.3s',

    '&:disabled': {
      filter: 'brightness(50%)',
      pointerEvents: 'none',
    },
  }),
);

const StyledKeywordInput = styled(StyledInput)(({ theme }) =>
  theme.unstable_sx({
    display: 'flex',
    alignItems: 'center',
    gap: 1,

    width: '100%',

    px: 1.5,
    py: 1,

    backgroundColor: 'background.searchBar',
    color: 'color.primary',

    textAlign: 'left',

    borderRadius: 10,

    '&::placeholder': {
      color: 'color.placeholder',
    },
  }),
);

const StyledAddInput = () => {
  const [keyword, setKeyword] = useState('');

  const { isValid, handleValidation } = useValidate();

  const { t } = useTranslation();

  const { mutate: addKeyword } = useMutation({
    mutationFn: (content: { content: string }) => httpClient.post(urls.keyWords, content),
    onSuccess: async () => {
      setKeyword('');
      queryClient.invalidateQueries([urls.keyWords]);
    },
    onError: () => toast.error('Nie udalo się dodać nowej frazy'),
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addKeyword({ content: keyword });
    handleValidation('');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleValidation(event.target.value);
    setKeyword(event.target.value);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormControl onChange={handleChange} value={keyword} style={{ width: '100%', position: 'relative' }}>
        <StyledKeywordInput placeholder={t('addKeyword')} />
      </FormControl>
      <StyledSubmitButton disabled={!isValid} type={'submit'}>
        <StyledIcon src={plusIcon} alt={'Add keyword'} width={20} height={20} />
      </StyledSubmitButton>
    </StyledForm>
  );
};

export default StyledAddInput;
