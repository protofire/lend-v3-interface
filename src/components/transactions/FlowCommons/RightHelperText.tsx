import { ExternalLinkIcon } from '@heroicons/react/outline';
import { Trans } from '@lingui/macro';
import { Box, Link, SvgIcon } from '@mui/material';
import { MOCK_SIGNED_HASH } from 'src/helpers/useTransactionHandler';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { useRootStore } from 'src/store/root';

export type RightHelperTextProps = {
  approvalHash?: string;
  tryPermit?: boolean;
};

const ExtLinkIcon = () => (
  <SvgIcon sx={{ ml: '2px', fontSize: '11px' }}>
    <ExternalLinkIcon />
  </SvgIcon>
);

export const RightHelperText = ({ approvalHash, tryPermit }: RightHelperTextProps) => {
  const { walletApprovalMethodPreference } = useRootStore();
  const usingPermit = tryPermit && walletApprovalMethodPreference;
  const { currentNetworkConfig } = useProtocolDataContext();
  const isSigned = approvalHash === MOCK_SIGNED_HASH;
  // a signature is not submitted on-chain so there is no link to review
  if (!approvalHash && !isSigned && tryPermit) return <></>;

  if (approvalHash && !usingPermit)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          pb: 1,
        }}
      >
        {approvalHash && (
          <Link
            variant="helperText"
            href={currentNetworkConfig.explorerLinkBuilder({ tx: approvalHash })}
            sx={{ display: 'inline-flex', alignItems: 'center' }}
            underline="hover"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Trans>Review approval tx details</Trans>
            <ExtLinkIcon />
          </Link>
        )}
      </Box>
    );
  return <></>;
};
