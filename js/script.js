$(document).ready(function () {
  // Smooth scrolling for internal navigation links
  $('a.nav-link, a.btn[href^="#"]').on('click', function (event) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 80
      }, 600);
    }
  });

  // Initialize tooltip and popover
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  // Fade in sections on scroll
  function animateSections() {
    $('[data-animate]').each(function () {
      var elementTop = $(this).offset().top;
      var windowBottom = $(window).scrollTop() + $(window).height() - 80;
      if (windowBottom > elementTop) {
        $(this).addClass('visible');
      }
    });
  }
  animateSections();
  $(window).on('scroll resize', animateSections);

  // Skill toggle button to show/hide extra section
  $('#toggleSkills').on('click', function () {
    $('#skillList').slideToggle(300);
    $(this).toggleClass('btn-primary btn-outline-primary');
  });

  // Slide content interaction
  $('#slideButton').on('click', function () {
    $('#slideContent').slideToggle(250);
  });

  // Project modal dynamic content
  $('.project-detail').on('click', function () {
    var projectKey = $(this).data('project');
    var modal = $('#projectModal');
    var title = 'Project overview';
    var description = '';
    var role = '';
    var highlights = [];

    if (projectKey === 'fintech') {
      title = 'eduGPT';
      description = 'An educational GPT-based companion focused on improving conceptual learning. The system assists users in understanding topics deeply rather than just providing answers, aligning with my passion for concept-driven education.';
      role = 'AI/ML project developer.';
      highlights = ['Concept-focused learning', 'GPT integration', 'Educational design'];
    } else if (projectKey === 'brand') {
      title = 'FPGA Edge Accelerator';
      description = 'A hardware-accelerated CNN inference system on Zynq FPGA platforms. This project compares CPU-only execution with hardware-accelerated approaches using HLS, exploring performance optimization for edge AI systems.';
      role = 'System design & FPGA developer.';
      highlights = ['CNN acceleration', 'HLS optimization', 'Performance benchmarking'];
    } else if (projectKey === 'portfolio') {
      title = 'Quantum Gap';
      description = 'An ongoing research project exploring differences between classical and quantum approaches to computational problems. This work helps me understand emerging computational paradigms and their practical advantages.';
      role = 'Quantum computing researcher.';
      highlights = ['Quantum algorithms', 'Classical comparison', 'Paradigm exploration'];
    }

    modal.find('.modal-title').text(title);
    modal.find('#projectModalDescription').text(description);
    modal.find('#projectModalRole').text(role);
    var highlightsList = modal.find('#projectModalHighlights');
    highlightsList.empty();
    highlights.forEach(function (item) {
      highlightsList.append('<li>' + item + '</li>');
    });
    var projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
    projectModal.show();
  });

  // Form validation and simple submission feedback
  $('#contactForm').on('submit', function (event) {
    event.preventDefault();
    var form = this;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      $(form).addClass('was-validated');
      return;
    }
    $(this).removeClass('was-validated');
    $('#contactAlert').removeClass('d-none');
    setTimeout(function () {
      $('#contactAlert').addClass('d-none');
      form.reset();
    }, 2500);
  });
});
