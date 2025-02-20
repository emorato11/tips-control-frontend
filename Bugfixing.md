# Bugfixing

## Problemas con calendario, filtro de Tipster y reseteo

> Comprobar las casuísticas en las que se rompe. Creo que esto pasa cuando seleccionas algún filtro (fecha o Tipster), que no contiene ningún Tip, y quitas el filtro del Tipster o de la fecha, da un pete en consola "Cannot read properties of null (reading 'fitContent')" y se jode