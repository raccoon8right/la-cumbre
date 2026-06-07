import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export const generarReportePedidos = (pedidos) => {
    const doc = new jsPDF()

    // Header
    doc.setFillColor(15, 59, 122)
    doc.rect(0, 0, 210, 30, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text('La Cumbre - Genuine Pewter', 14, 15)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.text('Reporte de Pedidos', 14, 23)

    // Fecha
    doc.setTextColor(100, 100, 100)
    doc.setFontSize(10)
    doc.text(`Generado: ${new Date().toLocaleDateString('es-BO')}`, 14, 38)

    // Resumen
    const pendientes = pedidos.filter(p => p.estado === 'pendiente').length
    const enviados = pedidos.filter(p => p.estado === 'enviado').length
    const entregados = pedidos.filter(p => p.estado === 'entregado').length
    const total = pedidos.reduce((acc, p) => acc + parseFloat(p.total), 0)

    doc.setFillColor(243, 239, 230)
    doc.rect(14, 42, 182, 24, 'F')
    doc.setTextColor(15, 59, 122)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text(`Total pedidos: ${pedidos.length}`, 20, 52)
    doc.text(`Pendientes: ${pendientes}`, 70, 52)
    doc.text(`Enviados: ${enviados}`, 120, 52)
    doc.text(`Entregados: ${entregados}`, 160, 52)
    doc.text(`Ingresos totales: Bs. ${total.toFixed(2)}`, 20, 61)

    // Tabla
    autoTable(doc, {
        startY: 72,
        head: [['Código', 'Dirección', 'Total (Bs.)', 'Estado', 'Fecha']],
        body: pedidos.map(p => [
            p.cod,
            p.direccion_entrega,
            parseFloat(p.total).toFixed(2),
            p.estado,
            new Date(p.fecha).toLocaleDateString('es-BO')
        ]),
        headStyles: {
            fillColor: [15, 59, 122],
            textColor: 255,
            fontStyle: 'bold'
        },
        alternateRowStyles: {
            fillColor: [243, 239, 230]
        },
        styles: {
            fontSize: 10,
            cellPadding: 4
        }
    })

    // Footer
    const paginas = doc.internal.getNumberOfPages()
    for (let i = 1; i <= paginas; i++) {
        doc.setPage(i)
        doc.setFontSize(9)
        doc.setTextColor(150, 150, 150)
        doc.text(`La Cumbre © ${new Date().getFullYear()}`, 14, 290)
        doc.text(`Página ${i} de ${paginas}`, 180, 290)
    }

    doc.save(`reporte-pedidos-${Date.now()}.pdf`)
}

export const generarReporteProductos = (productos) => {
    const doc = new jsPDF()

    doc.setFillColor(15, 59, 122)
    doc.rect(0, 0, 210, 30, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text('La Cumbre - Genuine Pewter', 14, 15)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.text('Reporte de Productos', 14, 23)

    doc.setTextColor(100, 100, 100)
    doc.setFontSize(10)
    doc.text(`Generado: ${new Date().toLocaleDateString('es-BO')}`, 14, 38)

    const activos = productos.filter(p => p.activo).length
    const inactivos = productos.filter(p => !p.activo).length

    doc.setFillColor(243, 239, 230)
    doc.rect(14, 42, 182, 24, 'F')
    doc.setTextColor(15, 59, 122)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text(`Total productos: ${productos.length}`, 20, 52)
    doc.text(`Activos: ${activos}`, 90, 52)
    doc.text(`Inactivos: ${inactivos}`, 150, 52)

    autoTable(doc, {
        startY: 72,
        head: [['Código', 'Nombre', 'Tipo', 'Precio (Bs.)', 'Stock', 'Estado']],
        body: productos.map(p => [
            p.cod,
            p.nombre,
            p.tipo || '-',
            parseFloat(p.precio).toFixed(2),
            p.stock,
            p.activo ? 'Activo' : 'Inactivo'
        ]),
        headStyles: {
            fillColor: [15, 59, 122],
            textColor: 255,
            fontStyle: 'bold'
        },
        alternateRowStyles: {
            fillColor: [243, 239, 230]
        },
        styles: {
            fontSize: 10,
            cellPadding: 4
        }
    })

    const paginas = doc.internal.getNumberOfPages()
    for (let i = 1; i <= paginas; i++) {
        doc.setPage(i)
        doc.setFontSize(9)
        doc.setTextColor(150, 150, 150)
        doc.text(`La Cumbre © ${new Date().getFullYear()}`, 14, 290)
        doc.text(`Página ${i} de ${paginas}`, 180, 290)
    }

    doc.save(`reporte-productos-${Date.now()}.pdf`)
}