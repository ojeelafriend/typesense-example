# typesense-example

Con un ejemplo como un buscador de productos de un ecommerce, demostraremos una alternativa a Elasticsearch eficiente y rápida en su implementación, con la cual podremos solucionar los siguientes problemas:

### ➕ Autocompletado

![gif-autocomplete](https://github.com/user-attachments/assets/c865e5e7-a00b-41f5-884b-39b78279eb81)

> En este buscador un evento onChange captura el value del input para realizar una request a la API. Esto devuelve las sugerencias.

### ❎ Tolerancia a errores tipográficos (Typo tolerance)
![gif-typo-tolerance](https://github.com/user-attachments/assets/f6dc0da7-a082-46d0-9958-b0d4febeb4bb)


### 🗒️ Sinónimos

[Más sobre las bondades de typesense](https://typesense.org/docs/overview/features.html).

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

```bash
pip install foobar
```

## Usage

```python
import foobar

# returns 'words'
foobar.pluralize('word')

# returns 'geese'
foobar.pluralize('goose')

# returns 'phenomenon'
foobar.singularize('phenomena')
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
