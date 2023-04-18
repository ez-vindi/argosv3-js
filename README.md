# ArgosV3 - Documentação do JS
O ArgosV3 é um sistema para análise de usabilidade e conversão.

## Instalação do script
O script argosv3.js faz a captura automática de eventos como visualização de páginas, eventos e formulários.

```javascript
<script src="https://ezanatta-vindi.github.io/argosv3-js/argosv3.min.js?v3"></script>
```

## Opções de uso do script
Algumas flags podem ser inseridas para alterar o comportamento padrão do script.

### Não rastrear visualizações de páginas
```javascript
argosOnlySession = true // default false
```

### Não rastrear envios de formulários (submit)
```javascript
argosNoForms = true // default false
```

## Uso alternativo ao script (para sites com limitações ou e-mails)
```html
<img src="https://argosv3.analytics.vindi.com.br/pixel.gif?data=1:valor1;2:valor2" referrerpolicy="no-referrer-when-downgrade">
```

O parametro **data** é por onde são enviadas os dados. O nome dos campos são definidos por ids e o valor separado por **":"**. Os dados são dividos por **";"**. Em caso de duvidas, consulte o exemplo acima.

## Referencia de parametros da API

### EventType
1. pageview
2. session
3. form
4. pixel

### Fieldlist

#### EventType = pageview

7. domain
8. path

#### EventType = session
- 1 device (1-mobile / 2-tablet / 3-computer)
- 2 utm_source
- 3 utm_medium
- 4 utm_campaign
- 5 gclid
- 6 fbclid
- 9 referer
- 10 utm_content
- 11 utm_term
- 12 IP
- 18 domain
- 19 path

#### EventType = form
- 13 Form Action
- 14 Form ID
- 15 URL of Form

#### EventType = pixel

- 16 campaign
- 17 email