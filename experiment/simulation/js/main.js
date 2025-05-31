
const moleculeData = {
    benzene: {
        name: "Benzene (C₆H₆)",
        formula: "C₆H₆",
        structure: "Aromatic ring",
        uv: {
            peaks: [254, 204],
            principle: "UV spectroscopy measures electronic transitions. Benzene shows π→π* transitions due to its conjugated aromatic system.",
            analysis: "Strong absorption at 254 nm (E2 band) and 204 nm (B band) characteristic of benzene's aromatic system. The extended conjugation lowers the energy gap between HOMO and LUMO.",
            applications: "Used for identifying aromatic compounds, studying conjugation, and analyzing purity of aromatic substances."
        },
        ir: {
            peaks: [3030, 1600, 1500, 674],
            principle: "IR spectroscopy detects molecular vibrations. Different functional groups absorb at characteristic frequencies.",
            analysis: "C-H stretch at 3030 cm⁻¹, C=C aromatic stretches at 1600 and 1500 cm⁻¹, and out-of-plane bending at 674 cm⁻¹ confirm aromatic structure.",
            applications: "Functional group identification, structure confirmation, and quality control in pharmaceutical and chemical industries."
        },
        nmr: {
            peaks: [7.2],
            principle: "NMR spectroscopy studies nuclear magnetic resonance of hydrogen atoms in different chemical environments.",
            analysis: "Single peak at 7.2 ppm shows all hydrogens are equivalent due to benzene's symmetrical structure. Downfield shift indicates aromatic deshielding.",
            applications: "Structure elucidation, purity analysis, and studying molecular dynamics and interactions."
        }
    },
    acetone: {
        name: "Acetone (C₃H₆O)",
        formula: "C₃H₆O",
        structure: "Ketone functional group",
        uv: {
            peaks: [280],
            principle: "UV spectroscopy reveals n→π* transition of the carbonyl group in acetone.",
            analysis: "Weak absorption around 280 nm corresponds to n→π* transition of the carbonyl oxygen lone pair to the π* orbital of C=O bond.",
            applications: "Detecting carbonyl compounds, studying solvent effects, and analyzing ketone concentrations."
        },
        ir: {
            peaks: [2970, 1715, 1430, 1230],
            principle: "IR spectroscopy identifies the characteristic C=O stretch and C-H vibrations in acetone.",
            analysis: "Strong C=O stretch at 1715 cm⁻¹ (ketone), C-H stretches around 2970 cm⁻¹, and C-C stretches confirm ketone structure.",
            applications: "Identifying ketones, monitoring reaction progress, and quality control in solvent production."
        },
        nmr: {
            peaks: [2.1],
            principle: "¹H NMR shows the chemical environment of hydrogen atoms in acetone molecule.",
            analysis: "Single peak at 2.1 ppm representing the six equivalent methyl hydrogens. The chemical shift indicates proximity to electron-withdrawing carbonyl group.",
            applications: "Confirming acetone structure, studying keto-enol tautomerism, and analyzing solvent purity."
        }
    },
    ethanol: {
        name: "Ethanol (C₂H₆O)",
        formula: "C₂H₆O",
        structure: "Primary alcohol",
        uv: {
            peaks: [180],
            principle: "Ethanol shows n→σ* transitions of oxygen lone pairs, typically in far UV region.",
            analysis: "Weak absorption around 180 nm due to n→σ* transition of oxygen lone pairs. Limited conjugation results in high-energy transitions.",
            applications: "Analyzing alcohol content, studying hydrogen bonding effects, and monitoring fermentation processes."
        },
        ir: {
            peaks: [3350, 2980, 1050, 880],
            principle: "IR spectroscopy reveals O-H stretch, C-H stretches, and C-O stretch characteristic of alcohols.",
            analysis: "Broad O-H stretch at 3350 cm⁻¹ (hydrogen bonded), C-H stretches around 2980 cm⁻¹, and C-O stretch at 1050 cm⁻¹ confirm alcohol structure.",
            applications: "Alcohol identification, studying hydrogen bonding, and analyzing beverage alcohol content."
        },
        nmr: {
            peaks: [3.6, 2.3, 1.2],
            principle: "¹H NMR reveals different hydrogen environments: -CH₂-, -CH₃, and -OH groups.",
            analysis: "Triplet at 1.2 ppm (CH₃), quartet at 3.6 ppm (CH₂), and broad singlet at 2.3 ppm (OH). Coupling patterns confirm ethyl alcohol structure.",
            applications: "Structure confirmation, analyzing alcohol purity, and studying exchange processes."
        }
    }
};

let selectedMolecule = null;
let selectedTechnique = null;

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Molecule selection event listeners
    document.querySelectorAll('.molecule-card').forEach(card => {
        card.addEventListener('click', function () {
            // Remove previous selection
            document.querySelectorAll('.molecule-card').forEach(c => c.classList.remove('selected'));
            // Add selection to clicked card with animation
            this.classList.add('selected');
            selectedMolecule = this.dataset.molecule;
            updateSimulation();
        });
    });

    // Technique selection event listeners
    document.querySelectorAll('.technique-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove previous selection
            document.querySelectorAll('.technique-btn').forEach(b => b.classList.remove('selected'));
            // Add selection to clicked button with animation
            this.classList.add('selected');
            selectedTechnique = this.dataset.technique;
            updateSimulation();
        });
    });
});

function updateSimulation() {
    if (!selectedMolecule || !selectedTechnique) return;

    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.style.display = 'block';
    resultsContainer.classList.add('show');

    const data = moleculeData[selectedMolecule][selectedTechnique];

    // Update spectrum title with animation
    const spectrumTitle = document.getElementById('spectrumTitle');
    spectrumTitle.style.opacity = '0';
    setTimeout(() => {
        spectrumTitle.textContent = selectedTechnique.toUpperCase() + ' Spectrum - ' + moleculeData[selectedMolecule].name;
        spectrumTitle.style.opacity = '1';
        spectrumTitle.style.transition = 'opacity 0.5s ease';
    }, 200);

    // Show loading animation
    const loadingElement = document.getElementById('spectrumLoading');
    const canvasElement = document.getElementById('spectrumCanvas');

    loadingElement.style.display = 'flex';
    canvasElement.style.display = 'none';

    // Simulate loading time and then draw spectrum
    setTimeout(() => {
        drawSpectrum(selectedTechnique, data.peaks);
        loadingElement.style.display = 'none';
        canvasElement.style.display = 'block';
        canvasElement.style.opacity = '0';
        setTimeout(() => {
            canvasElement.style.opacity = '1';
            canvasElement.style.transition = 'opacity 0.5s ease';
        }, 100);
    }, 1500);

    // Update analysis content with staggered animation
    const elements = [
        { element: document.getElementById('techniquePrinciple'), content: data.principle },
        { element: document.getElementById('peakAnalysis'), content: data.analysis },
        { element: document.getElementById('applications'), content: data.applications }
    ];

    elements.forEach((item, index) => {
        setTimeout(() => {
            item.element.style.opacity = '0';
            item.element.style.transform = 'translateY(20px)';
            item.element.style.transition = 'all 0.5s ease';

            setTimeout(() => {
                item.element.textContent = item.content;
                item.element.style.opacity = '1';
                item.element.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
}

function drawSpectrum(technique, peaks) {
    const canvas = document.getElementById('spectrumCanvas');
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set up coordinate system
    const margin = 40;
    const width = canvas.width - 2 * margin;
    const height = canvas.height - 2 * margin;

    // Animate drawing of axes
    setTimeout(() => {
        drawAxes(ctx, margin, width, height);
    }, 200);

    // Set labels and ranges based on technique
    let xLabel, yLabel, xRange, yRange;
    switch (technique) {
        case 'uv':
            xLabel = 'Wavelength (nm)';
            yLabel = 'Absorbance';
            xRange = [200, 400];
            yRange = [0, 1];
            break;
        case 'ir':
            xLabel = 'Wavenumber (cm⁻¹)';
            yLabel = 'Transmittance (%)';
            xRange = [4000, 500];
            yRange = [0, 100];
            break;
        case 'nmr':
            xLabel = 'Chemical Shift (ppm)';
            yLabel = 'Intensity';
            xRange = [10, 0];
            yRange = [0, 1];
            break;
    }

    // Draw labels with delay
    setTimeout(() => {
        drawLabels(ctx, xLabel, yLabel, margin, width, canvas.height);
    }, 500);

    // Draw peaks with animation
    setTimeout(() => {
        drawPeaksAnimated(ctx, technique, peaks, xRange, margin, width, height);
    }, 800);
}

function drawAxes(ctx, margin, width, height) {
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(margin, margin);
    ctx.lineTo(margin, height + margin);
    ctx.lineTo(width + margin, height + margin);
    ctx.stroke();
}

function drawLabels(ctx, xLabel, yLabel, margin, width, canvasHeight) {
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(xLabel, margin + width / 2, canvasHeight - 5);
    ctx.save();
    ctx.translate(15, margin + (canvasHeight - 2 * margin) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(yLabel, 0, 0);
    ctx.restore();
}

function drawPeaksAnimated(ctx, technique, peaks, xRange, margin, width, height) {
    ctx.strokeStyle = technique === 'uv' ? '#3B82F6' : technique === 'ir' ? '#EF4444' : '#8B5CF6';
    ctx.fillStyle = technique === 'uv' ? '#3B82F6' : technique === 'ir' ? '#EF4444' : '#8B5CF6';
    ctx.lineWidth = 3;

    peaks.forEach((peak, index) => {
        setTimeout(() => {
            let x, y;

            if (technique === 'ir') {
                // IR shows absorption peaks (inverted)
                x = margin + width * (xRange[0] - peak) / (xRange[0] - xRange[1]);
                y = margin + height * 0.2;
            } else {
                // UV and NMR show normal peaks
                x = margin + width * (peak - xRange[0]) / (xRange[1] - xRange[0]);
                y = margin + height * 0.2;
            }

            // Animate peak drawing
            animatePeak(ctx, x, y, margin + height, peak.toString());
        }, index * 300);
    });

    // Draw baseline last
    setTimeout(() => {
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(margin, margin + height);
        ctx.lineTo(width + margin, margin + height);
        ctx.stroke();
    }, peaks.length * 300 + 200);
}

function animatePeak(ctx, x, yEnd, yStart, label) {
    let currentY = yStart;
    const speed = (yStart - yEnd) / 20;

    function drawFrame() {
        if (currentY > yEnd) {
            // Clear previous line
            ctx.clearRect(x - 2, yEnd - 20, 4, yStart - yEnd + 40);

            // Redraw axes in that area
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x, yStart);
            ctx.lineTo(x, currentY);
            ctx.stroke();

            // Set peak color
            ctx.strokeStyle = ctx.fillStyle;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x, yStart);
            ctx.lineTo(x, currentY);
            ctx.stroke();

            currentY -= speed;
            requestAnimationFrame(drawFrame);
        } else {
            // Final peak draw
            ctx.strokeStyle = ctx.fillStyle;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x, yStart);
            ctx.lineTo(x, yEnd);
            ctx.stroke();

            // Add label with fade in
            setTimeout(() => {
                ctx.fillText(label, x, yEnd - 10);
            }, 200);
        }
    }

    drawFrame();
}
