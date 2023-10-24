import { Box, Chip, FormControl, FormHelperText, InputLabel, ListItemText, MenuItem, Select } from '@mui/material';

export default function MultiSelectForm({
  options,
  value,
  setValue: { onChange, ...setValue },
  sortValues,
  sortLabel,
  denseMenu,
  requireAll,
  ...props
}) {
  const updateData = data => {
    onChange(sortValues ? data.sort((a, b) => a[sortLabel] - b[sortLabel]) : data);
  };

  const handleDelete = item => e => {
    updateData([...new Set([...value.filter(opt => opt.key !== item.key)])]);
  };

  const selectAll = e => {
    updateData(options);
  };

  const handleChange = item => e => {
    updateData([...new Set([...value, options.filter(opt => opt.key === item.key)[0]])]);
  };

  return (
    <>
      <Box sx={{ mt: 0.5, width: '100%' }}>
        <Box>
          {value.map(v => (
            <Chip sx={{ m: 0.5 }} key={v.key} label={v.label} value={v.key} variant='outlined' disabled={props.disabled} onDelete={handleDelete(v)} />
          ))}
        </Box>

        <FormControl sx={{ width: '100%', mt: 0.5 }} error={setValue.error} required={props.required}>
          <InputLabel id={`multiple-chip-label-${props.label}`}>{props.label}</InputLabel>
          <Select
            {...props}
            {...setValue}
            labelId={`multiple-chip-label-${props.label}`}
            displayEmpty
            fullWidth
            label={props.label}
            multiple
            value={[]}
            renderValue={() => ''}
          >
            {options.length === value.length && (
              <MenuItem disabled value=''>
                <em>{props.label}</em>
              </MenuItem>
            )}
            {value.length === 0 && requireAll && (
              <MenuItem value={'all'} onClick={selectAll} dense>
                <ListItemText primary={'All'} />
              </MenuItem>
            )}
            {options.map(
              item =>
                value.filter(opt => opt.key === item.key).length === 0 && (
                  <MenuItem key={item.key} value={item} onClick={handleChange(item)} dense={denseMenu}>
                    <ListItemText primary={item.label} />
                  </MenuItem>
                ),
            )}
          </Select>
          {setValue.error && <FormHelperText>{setValue.helperText}</FormHelperText>}
        </FormControl>
      </Box>
    </>
  );
}
