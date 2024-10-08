﻿// <auto-generated />
using System;
using Airfare.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Airfare.Data.Migrations
{
    [DbContext(typeof(AirfareContext))]
    [Migration("20211126061158_destinationAirport")]
    partial class destinationAirport
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Airfare.Domain.AdminDomains.AirportData", b =>
                {
                    b.Property<Guid>("AirportId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Abbrevation")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("AirportName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("AirportId");

                    b.HasIndex("Abbrevation")
                        .IsUnique();

                    b.ToTable("AirportData");
                });

            modelBuilder.Entity("Airfare.Domain.AdminDomains.FlightDetailsData", b =>
                {
                    b.Property<Guid>("FlightId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<TimeSpan>("ArrivalTime")
                        .HasColumnType("time");

                    b.Property<TimeSpan>("DepartureTime")
                        .HasColumnType("time");

                    b.Property<Guid>("DestinationAirportId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("Distance")
                        .HasColumnType("float");

                    b.Property<string>("FlightNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<Guid>("FlightOperatorOperatorId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("OperatingDays")
                        .HasColumnType("int");

                    b.Property<int>("SeatingFormatBusiness")
                        .HasColumnType("int");

                    b.Property<int>("SeatingFormatEconomy")
                        .HasColumnType("int");

                    b.Property<Guid>("SourceAirportId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("TotalSeatBusiness")
                        .HasColumnType("int");

                    b.Property<int>("TotalSeatEconomy")
                        .HasColumnType("int");

                    b.HasKey("FlightId");

                    b.HasIndex("DestinationAirportId");

                    b.HasIndex("FlightNumber")
                        .IsUnique();

                    b.HasIndex("FlightOperatorOperatorId");

                    b.HasIndex("SourceAirportId");

                    b.ToTable("FlightDetails");
                });

            modelBuilder.Entity("Airfare.Domain.AdminDomains.FlightOperatorData", b =>
                {
                    b.Property<Guid>("OperatorId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("BaseFare")
                        .HasColumnType("float");

                    b.Property<string>("CompanyName")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<double>("Convience")
                        .HasColumnType("float");

                    b.Property<double>("Tax")
                        .HasColumnType("float");

                    b.HasKey("OperatorId");

                    b.HasIndex("CompanyName")
                        .IsUnique();

                    b.ToTable("FlightOperator");
                });

            modelBuilder.Entity("Airfare.Domain.AdminDomains.FlightDetailsData", b =>
                {
                    b.HasOne("Airfare.Domain.AdminDomains.AirportData", "DestinationAirportData")
                        .WithMany("ArrivalFlights")
                        .HasForeignKey("DestinationAirportId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Airfare.Domain.AdminDomains.FlightOperatorData", "FlightOperator")
                        .WithMany()
                        .HasForeignKey("FlightOperatorOperatorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Airfare.Domain.AdminDomains.AirportData", "SourceAirportData")
                        .WithMany("DepartureFlights")
                        .HasForeignKey("SourceAirportId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("DestinationAirportData");

                    b.Navigation("FlightOperator");

                    b.Navigation("SourceAirportData");
                });

            modelBuilder.Entity("Airfare.Domain.AdminDomains.AirportData", b =>
                {
                    b.Navigation("ArrivalFlights");

                    b.Navigation("DepartureFlights");
                });
#pragma warning restore 612, 618
        }
    }
}
